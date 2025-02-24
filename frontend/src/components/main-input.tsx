"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useWebSocket } from '@/hooks/use-websocket'
import { submitURL } from "@/server-actions/submit-url"
import { Role, useConversation } from "@11labs/react"
import { useUser } from "@clerk/nextjs"
import { useName } from '@coinbase/onchainkit/identity'
import { Wifi, WifiOff } from "lucide-react"
import { useState } from "react"
import { base } from 'viem/chains'
import { useAccount } from "wagmi"

const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL
const selectedLanguage = 'en'

export function MainURLInput() {
    const { isSignedIn, user } = useUser()
    const [inCall, setInCall] = useState(false)
    const { address } = useAccount()
    const { data: name } = useName({ address: address as `0x${string}`, chain: base });

    const { isSpeaking, endSession, startSession } = useConversation({
        onConnection: async () => {
            console.log("Connected to conversation");
            setInCall(true);
        },
        onError(error: unknown) {
            console.error("Conversation error:", error);
            setInCall(false);
        },
        onDisconnect() {
            console.log("Disconnected from conversation");
            setInCall(false);
        },
        clientTools: {
            openLink: (parameters: { text: string }) => {
                window.open(parameters.text, "_blank");
                return "The link is now open in a new tab";
            },
        },
        onMessage(props: { message: string; source: Role; audio?: string }) {
            console.log(props)
        },
    });

    const { status: wsStatus } = useWebSocket({
        url: `${wsUrl}?userId=${user?.id}` || '',
        enabled: !!user?.id,
        onMessage: async (data: any) => {
            const message = JSON.parse(JSON.stringify(data));

            if (message.type === 'email') {
                const _message = message
                await startSession({
                    clientTools: {
                        openLink: (parameters: { url: string }) => {
                            console.log(`Opening link: ${parameters.url}`);
                            window.open(parameters.url, "_blank");
                            return "The link is now open in a new tab";
                        },
                    },
                    overrides: {
                        agent: {
                            prompt: {
                                prompt: _message.systemPrompt
                            },
                            language: selectedLanguage.toLowerCase() as any,
                            firstMessage: _message.firstMessageFromAgent
                        },
                    },
                    agentId: 'elevenlabs-agent-id',
                });
            }
        },
        onConnect: () => {
            console.log(`Connected to host ${user?.id}`);
        },
        onDisconnect: () => {
            console.log(`Disconnected from host ${user?.id}`);
        }
    });

    const renderConnectionStatus = () => {
        if (!isSignedIn) return null;

        return (
            <div className="absolute top-4 left-4 transition-opacity duration-200 group-hover:opacity-100 opacity-90 z-50">
                <Tooltip delayDuration={0}>
                    <TooltipTrigger>
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900/80 backdrop-blur-md">
                            {wsStatus === 'connected' ? (
                                <Wifi className="w-4 h-4 text-green-400" />
                            ) : wsStatus === 'connecting' ? (
                                <Wifi className="w-4 h-4 text-yellow-400 animate-pulse" />
                            ) : (
                                <WifiOff className="w-4 h-4 text-red-400" />
                            )}
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-zinc-900/95 backdrop-blur-md border-zinc-800 rounded-lg p-3 max-w-[200px]">
                        <p className="text-sm text-zinc-300 leading-relaxed">
                            Connection active
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>
        );
    };

    return (
        <div className="flex w-full max-w-sm items-center space-x-2 min-w-[450px]">
            <form action={async (formData) => {
                await submitURL(formData, name)
            }} className="flex w-full max-w-sm items-center space-x-2 min-w-[450px]">
                {renderConnectionStatus()}
                <Input
                    name="url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    disabled={!isSignedIn}
                />
                <Button type="submit" disabled={!isSignedIn}>Learn</Button>
            </form>
        </div>
    )
}
