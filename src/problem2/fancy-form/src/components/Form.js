import { useState } from "react";
import { useForm } from "react-hook-form";
import Web3 from 'web3'

export default function Form() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ mode: "all" })
    const [AmountValue, setAmountValue] = useState("");
    const [OTPValue, setOTPValue] = useState("");
    const [Result, setResult] = useState("");
    let web3 = new Web3(Web3.givenProvider);

    const onSendTokens = (data) => {
        if (data.OTP === "123456") {
            setResult(<div className="mt-10 text-green-600 font-bold">Successfully send {data.Amount} ETH to {data.ETHAddress}</div>)
            reset()
            setOTPValue("")
            setAmountValue("")
        }
        else {
            setResult(<div className="mt-10 text-red-600 font-bold">Wrong OTP</div>)
            setOTPValue("")
        }
        console.log(data)
    }

    const handleAmountValue = (data) => {
        const regex = /^[0-9]*\.?[0-9]*$/;;
        if (data.match(regex)) {
            setAmountValue(data)
        }
    }
    const handleOTPValue = (data) => {
        const regex = /^[0-9]+$/;
        if (data.match(regex) || data === "") {
            setOTPValue(data)
        }
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="bg-white py-6 rounded-md px-10 max-w-lg shadow-md">
                    <h1 className="text-center text-lg font-bold text-gray-500">Send ETH</h1>
                    <div className="space-y-4 mt-6">
                        <div className="w-full">
                            <input type="text" placeholder="ETH Address" className="px-4 py-2 bg-gray-50"
                                {...register("ETHAddress", { required: true, validate: value => web3.utils.isAddress(value) })}
                                onChange={(e) => setResult("")} />
                        </div>
                        {errors.ETHAddress && errors.ETHAddress.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                            This field is required
                        </span>)}
                        {errors.ETHAddress && errors.ETHAddress.type === "validate" && (<span className="text-red-500 text-xs italic p-2">
                            Invalid address
                        </span>)}
                        <div className="w-full">
                            <input type="text" placeholder="Amount to send" className="px-4 py-2 bg-gray-50"
                                {...register("Amount", { required: true, pattern: { value: /(?<=^| )\d+(\.\d+)?(?=$| )/ } })}
                                onChange={(e) => handleAmountValue(e.target.value)}
                                value={AmountValue} />

                        </div>
                        {errors.Amount && errors.Amount.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                            This field is required
                        </span>)}
                        {errors.Amount && errors.Amount.type === "pattern" && (<span className="text-red-500 text-xs italic p-2">
                            Invalid Format
                        </span>)}
                        <div className="w-full">
                            <input type="text" placeholder="OTP Authentication" className="px-4 py-2 bg-gray-50"
                                {...register("OTP", { required: true, minLength: 6, maxLength: 6 })}
                                onChange={(e) => handleOTPValue(e.target.value)}
                                value={OTPValue} />
                        </div>
                        {errors.OTP && errors.OTP.type === "required" && (<span className="text-red-500 text-xs italic p-2">
                            This field is required
                        </span>)}
                        {errors.OTP && errors.OTP.type === "minLength" && (<span className="text-red-500 text-xs italic p-2">
                            OTP should be 6 digits
                        </span>)}
                        {errors.OTP && errors.OTP.type === "maxLength" && (<span className="text-red-500 text-xs italic p-2">
                            OTP should be 6 digits
                        </span>)}
                    </div>
                    <button className="w-full mt-5 bg-indigo-600 text-white py-2 rounded-md font-semibold tracking-tight" onClick={handleSubmit(onSendTokens)}>Send Tokens</button>
                </div>
            </form>
            {Result}
        </>
    )
}