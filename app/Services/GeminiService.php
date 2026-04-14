<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected ?string $apiKey;
    protected string $baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/';

    public function __construct()
    {
        $this->apiKey = config('services.gemini.key');
    }

    /**
     * Generate content using Gemini 1.5 Flash.
     */
    public function generateContent(string $prompt)
    {
        if (empty($this->apiKey)) {
            return "Gemini API Key is not configured.";
        }

        try {
            // Reverting to the project's original stable model (Gemini 2.5) 
            $response = Http::timeout(40)->post($this->baseUrl . 'gemini-2.5-flash:generateContent?key=' . $this->apiKey, [
                'contents' => [
                    [
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ]
            ]);

            if ($response->successful()) {
                return $response->json('candidates.0.content.parts.0.text');
            }

            $errorBody = $response->body();
            Log::error('Gemini API Error: ' . $errorBody);
            
            // Fallback to Gemini 2.5 Pro
            if ($response->status() == 404 || $response->status() == 429) {
                Log::info('Gemini 2.5 Flash issue, falling back to gemini-2.5-pro');
                $fallbackResponse = Http::timeout(40)->post($this->baseUrl . 'gemini-2.5-pro:generateContent?key=' . $this->apiKey, [
                    'contents' => [['parts' => [['text' => $prompt]]]]
                ]);
                
                if ($fallbackResponse->successful()) {
                    return $fallbackResponse->json('candidates.0.content.parts.0.text');
                }
            }

            return "Error from Gemini API: " . $response->status();

        } catch (\Exception $e) {
            Log::error('Gemini Exception: ' . $e->getMessage());
            return "Error: " . $e->getMessage();
        }
    }

    /**
     * Analyze a CV and score it against a job description.
     */
    public function analyzeCV(string $cvText, string $jobDescription)
    {
        $prompt = "Bạn là một chuyên gia tuyển dụng cao cấp của Almus Tech. Hãy phân tích CV sau đây và so sánh nó với mô tả công việc (JD) để tạo một bản báo cáo Insight chuyên sâu.

        Mô tả công việc:
        {$jobDescription}

        Nội dung CV:
        {$cvText}

        Hãy trả về kết quả dưới dạng JSON có cấu trúc CHÍNH XÁC như sau (không kèm giải thích):
        {
          \"match_score\": (số từ 0-100),
          \"experience_evaluation\": \"Đánh giá chi tiết về số năm và chất lượng kinh nghiệm\",
          \"technical_fit\": [\"kỹ năng 1 đạt\", \"kỹ năng 2 thiếu\", ...],
          \"soft_skills\": [\"kỹ năng mềm 1\", \"kỹ năng mềm 2\", ...],
          \"interview_questions\": [\"câu hỏi phỏng vấn 1\", \"câu hỏi phỏng vấn 2\", ...],
          \"recommendation\": \"Highly Recommend / Strong Fit / Potential / Not Recommended\",
          \"summary\": \"Tóm tắt chiến lược về ứng viên trong 3 câu\"
        }";

        $response = $this->generateContent($prompt);
        return $this->cleanJsonResponse($response);
    }

    private function cleanJsonResponse($response)
    {
        // Remove markdown JSON code blocks if present
        $clean = preg_replace('/^```json\s*|\s*```$/i', '', trim($response));
        return $clean;
    }

    /**
     * Generate a professional Job Description.
     */
    public function generateJD(string $jobTitle, array $requirements = [])
    {
        $reqStr = implode(', ', $requirements);
        $prompt = "Hãy viết một mô tả công việc (Job Description) chuyên nghiệp cho vị trí '{$jobTitle}'. 
        Các yêu cầu chính: {$reqStr}.
        Hãy trình bày theo phong cách hiện đại, thu hút tài năng, bao gồm các phần: Mô tả công việc, Yêu cầu ứng viên, Quyền lợi.
        Sử dụng định dạng Markdown.";

        return $this->generateContent($prompt);
    }
}
