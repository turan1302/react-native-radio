<?php

namespace App\Http\Requests\api\radio;

use Illuminate\Foundation\Http\FormRequest;

class CreateRadioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "rd_name" => "required|string|max:32|unique:radios",
            "rd_link" => "required|string|max:32|unique:radios",
        ];
    }

    public function attributes()
    {
        return [
            "rd_name" => "Radyo Adı",
            "rd_link" => "Radyo Link"
        ];
    }
}
