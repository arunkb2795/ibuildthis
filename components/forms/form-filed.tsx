import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface FormFiledProps {
  label: string;
  name: string;
  placeholder: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  helperText?: string;
  textarea?: boolean;
  error?: string;
}

export default function FormFiled({
  label,
  name,
  placeholder,
  required,
  onChange,
  helperText,
  error,
  textarea,
}: FormFiledProps) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor={name}>{label}</FieldLabel>
        {textarea ? (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
          />
        ) : (
          <Input
            id={name}
            name={name}
            placeholder={placeholder}
            required={required}
            onChange={onChange}
          />
        )}

        {helperText && <p className="text-sm text-gray-500">{helperText}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </Field>
    </>
  );
}
