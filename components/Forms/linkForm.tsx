"use client";

import React, { useState } from "react";
import TextInput from "../formInputs/text-input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Loader, ScissorsLineDashed } from "lucide-react";
import { shortenLink } from "@/actions/linkAction";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export type FormProps = {
  longUrl: string;
  userId: string;
};
export default function LinkForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function submit(data: FormProps) {
    try {
      setLoading(true);
      await shortenLink(data);
      toast.success("Link shortened successfully.");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong.");
    } finally {
      setLoading(false);
      reset();
      router.refresh();
      router.push("/");
      router.prefetch("/");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex items-center sm:flex-row gap-3 max-w-2xl mx-auto "
    >
      <div className="w-full">
        <TextInput
          type="url"
          register={register}
          placeholder="long url"
          errors={errors}
          name="longUrl"
        />
      </div>
      <div>
        {loading ? (
          <Button
            size="lg"
            disabled
            className="bg-[#FF6B6C] hidden md:flex items-center gap-2  hover:bg-[#FF5B5C] text-white  py-2 mt-2"
            type="button"
          >
            <Loader className="w-4 h-4 animate-spin" />
            wait...
          </Button>
        ) : (
          <Button
            size="lg"
            className="bg-[#FF6B6C] hidden md:block  hover:bg-[#FF5B5C] text-white  py-2 mt-2"
            type="submit"
          >
            Shorten Link
          </Button>
        )}
        {loading ? (
          <Button
            size="icon"
            disabled
            className="bg-[#FF6B6C] block md:hidden  hover:bg-[#FF5B5C] text-white mt-2 px-2"
            type="button"
          >
            <Loader className="w-4 h-4 animate-spin" />
          </Button>
        ) : (
          <Button
            size="icon"
            className="bg-[#FF6B6C] block md:hidden  hover:bg-[#FF5B5C] text-white mt-2 px-2"
            type="submit"
          >
            <ScissorsLineDashed className="w-4 h-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
