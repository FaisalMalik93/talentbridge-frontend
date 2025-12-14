import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import apiClient from "@/lib/api-client"

export default function VerifyEmailPage() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('')
    const verifyCalled = useRef(false)

    useEffect(() => {
        if (!token) {
            setStatus('error')
            setMessage("No verification token found.")
            return
        }

        if (verifyCalled.current) return
        verifyCalled.current = true

        const verify = async () => {
            try {
                const response = await apiClient.get<any>(`/api/auth/verify-email?token=${token}`)
                if (response.data) {
                    setStatus('success')
                    setMessage(response.data.message)
                } else {
                    // Check if it's an "already verified" message from the backend logs or generic error
                    // But usually 400 returns error field.
                    // If we want to be smarter, we could assume if it fails it might be race condition? 
                    // No, let's stick to strict logic but prevent double call.
                    setStatus('error')
                    setMessage(response.error || "Verification failed")
                }
            } catch (err) {
                setStatus('error')
                setMessage("An error occurred during verification.")
            }
        }

        verify()
    }, [token])

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
            <Card className="bg-gray-800 border-gray-700 max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        {status === 'loading' && <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />}
                        {status === 'success' && <CheckCircle className="w-12 h-12 text-green-500" />}
                        {status === 'error' && <XCircle className="w-12 h-12 text-red-500" />}
                    </div>
                    <CardTitle className="text-2xl">
                        {status === 'loading' && "Verifying Email..."}
                        {status === 'success' && "Email Verified!"}
                        {status === 'error' && "Verification Failed"}
                    </CardTitle>
                    <p className="text-gray-400 mt-2">
                        {status === 'loading' && "Please wait while we verify your account."}
                        {message}
                    </p>
                </CardHeader>
                <CardContent className="flex justify-center">
                    {status !== 'loading' && (
                        <Link href="/auth/signin">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                Go to Sign In
                            </Button>
                        </Link>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
