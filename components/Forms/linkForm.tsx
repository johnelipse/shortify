"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import TextInput from "../formInputs/text-input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { ScissorsLineDashed } from "lucide-react";

export default function LinkForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function submit(data: any) {
    console.log(data);
    reset();
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
          placeholder="Enter long url..."
          errors={errors}
          name="longUrl"
        />
      </div>
      <div>
        <Button
          size="lg"
          className="bg-[#FF6B6C] hidden md:block  hover:bg-[#FF5B5C] text-white  py-2 mt-2"
          type="submit"
        >
          Shorten Link
        </Button>
        <Button
          size="icon"
          className="bg-[#FF6B6C] block md:hidden  hover:bg-[#FF5B5C] text-white mt-2 px-2"
          type="submit"
        >
          <ScissorsLineDashed className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
