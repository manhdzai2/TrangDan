import React, { useEffect } from 'react';
import RecruitmentLayout from '@/Layouts/RecruitmentLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <RecruitmentLayout>
            <Head title="Đăng ký thành viên - AMT Careers" />

            <div className="min-h-[80vh] flex flex-col sm:justify-center items-center pt-10 pb-20 px-6">
                <div className="w-full sm:max-w-xl mt-6 px-10 py-12 glass-effect shadow-2xl border-white/40">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-3">Tạo tài khoản mới</h2>
                        <p className="text-slate-500 font-medium text-lg">Bắt đầu hành trình sự nghiệp đầy hứa hẹn tại AMT</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="name" value="Họ và Tên" className="text-slate-600 font-bold ml-1 mb-2" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="block w-full border-slate-200 focus:border-[#06AED5] focus:ring-[#06AED5] rounded-xl shadow-sm h-12"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Địa chỉ Email" className="text-slate-600 font-bold ml-1 mb-2" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full border-slate-200 focus:border-[#06AED5] focus:ring-[#06AED5] rounded-xl shadow-sm h-12"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel htmlFor="password" value="Mật khẩu" className="text-slate-600 font-bold ml-1 mb-2" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="block w-full border-slate-200 focus:border-[#06AED5] focus:ring-[#06AED5] rounded-xl shadow-sm h-12"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Xác nhận mật khẩu" className="text-slate-600 font-bold ml-1 mb-2" />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="block w-full border-slate-200 focus:border-[#06AED5] focus:ring-[#06AED5] rounded-xl shadow-sm h-12"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                className={`w-full btn-primary text-xl flex items-center justify-center py-4 ${processing && 'opacity-25'}`}
                                disabled={processing}
                            >
                                Đăng ký ngay
                            </button>
                        </div>

                        <div className="text-center mt-8 pt-8 border-t border-slate-100">
                            <span className="text-slate-500 text-lg">Đã có tài khoản? </span>
                            <Link href="/login" className="text-[#06AED5] font-black hover:underline text-lg ml-2">Đăng nhập</Link>
                        </div>
                    </form>
                </div>
            </div>
        </RecruitmentLayout>
    );
}
