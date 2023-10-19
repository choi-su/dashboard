'use client';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Separator } from '../ui/separator';
import { redirect, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Loader } from '../ui/loader';
const formSchema = z.object({
    email: z
        .string()
        .min(2, { message: '최소두자이상 입력' })
        .max(50)
        .email({ message: '이메일형식으로 입력해주세요' }),
    password: z.string().min(2).max(50),
});
type AuthProviderValues = z.infer<typeof formSchema>;

//상위 컴포넌트에서 세션 상태를 받아와서 로그인 이면 로그아웃 버튼 나오게
const AuthProvider = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm<AuthProviderValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = async (data: AuthProviderValues) => {
        try {
            setLoading(true);
            // await axios.post(`/api/register`, data);
            await signIn('credentials', {
                ...data,
                redirect: false,
            })
                .then((res) => {
                    if (res?.ok) {
                        router.refresh();
                        router.push('/');
                        toast.success('로그인 성공');
                    }
                    if (res?.error) {
                        toast.error(res.error);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (err) {}
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>이메일</FormLabel>
                                <FormControl>
                                    <Input placeholder="이메일" {...field} />
                                </FormControl>
                                {/* <FormDescription>이메일</FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Separator />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>비밀번호</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="비밀번호"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>비밀번호</FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-full" disabled={loading} type="submit">
                        {loading ? <Loader size={16} /> : '로그인'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AuthProvider;
