import "./SearchForm.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputMask } from "@react-input/mask";
import type { MaskEventDetail, MaskEvent } from "@react-input/mask";
import { apiClient, apiConfig } from "../api/axiosConfig";
import { AxiosResponse } from "axios";

interface ISearchForm {
  email: string;
  phone?: string;
}

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Missing email")
    .matches(emailRegex, "Invalid email format"),
  phone: yup.string().optional(),
});

const formOptions = { resolver: yupResolver(validationSchema) };

const SearchForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ISearchForm>(formOptions);

  const [detail, setDetail] = useState<MaskEventDetail | null>(null);

  const handleMask = (event: MaskEvent) => {
    setDetail(event.detail);
  };

  const onSubmit = async (data: ISearchForm) => {
    try {
      const response: AxiosResponse = await apiClient.post(
        "/clients",
        data,
        apiConfig
      );

      if (response.status !== 200) {
        throw new Error(`Failed (HTTP status code: ${response.status})`);
      }

      const client = await response.data;
      console.log(client);
    } catch (error) {
      console.log(error);
    }

    setDetail(null);
    reset();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label">Email</label>
        <input
          {...register("email")}
          type="text"
          className="input"
          placeholder="Enter Email"
          autoComplete="off"
        />
        {errors.email && <div className="error">{errors.email.message}</div>}
      </div>
      <div className="field">
        <label className="label">Phone</label>
        <InputMask
          {...register("phone")}
          type="text"
          className="input"
          placeholder="Enter Phone"
          autoComplete="off"
          mask="__-__-__"
          replacement={{ _: /\d/ }}
          value={detail?.value ?? ""}
          onMask={handleMask}
        />
      </div>
      <div>
        <button type="submit" className="button">
          Search
        </button>
      </div>
    </form>
  );
};
export default SearchForm;
