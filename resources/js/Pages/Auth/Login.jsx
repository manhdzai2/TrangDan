import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <RecruitmentLayout>
            <Head title="Đăng nhập - AMT Careers" />
            
            <div className="min-h-[70vh] flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
                <div className="w-full sm:max-w-md mt-6 px-10 py-12 glass-effect shadow-2xl border-white/40">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Chào mừng trở lại!</h2>
                        <p className="text-slate-500 font-medium">Đăng nhập để tiếp tục hành trình cùng AMT</p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 border-l-4 border-green-500 bg-green-50 p-3 rounded">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="email" value="Email của bạn" className="text-slate-600 font-bold ml-1 mb-2" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="block w-full border-slate-200 focus:border-[#06AED5] focus:ring-[#06AED5] rounded-xl shadow-sm h-12"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="password" value="Mật khẩu" className="text-slate-600 font-bold ml-1 mb-2" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="block w-full border-slate-200 focus:border-[#06AED5] focus:ring-[#06AED5] rounded-xl shadow-sm h-12"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-slate-300 text-[#06AED5] focus:ring-[#06AED5]"
                                />
                                <span className="ms-2 text-sm text-slate-600 font-medium cursor-pointer">Ghi nhớ đăng nhập</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-[#06AED5] hover:underline font-bold"
                                >
                                    Quên mật khẩu?
                                </Link>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                className={`w-full btn-primary text-lg flex items-center justify-center ${processing && 'opacity-25'}`}
                                disabled={processing}
                            >
                                Đăng nhập ngay
                            </button>
                        </div>
                        
                        <div className="text-center mt-8 pt-6 border-t border-slate-100">
                            <span className="text-slate-500">Chưa có tài khoản? </span>
                            <Link href="/register" className="text-[#06AED5] font-black hover:underline">Đăng ký thành viên</Link>
                        </div>
                    </form>
                </div>
            </div>
        </RecruitmentLayout>
    );
}
