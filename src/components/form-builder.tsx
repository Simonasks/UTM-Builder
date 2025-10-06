interface FormField {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
}

interface FormBuilderProps {
  fields: FormField[];
}

export function FormBuilder({ fields }: FormBuilderProps) {
  return (
    <form className="space-y-4">
      {fields.map((field) => (
        <label key={field.id} className="flex flex-col gap-2 text-sm text-slate-600">
          <span className="font-medium text-slate-900">
            {field.label} {field.required ? <span className="text-rose-500">*</span> : null}
          </span>
          <input
            className="rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder={field.hint}
          />
        </label>
      ))}
      <button className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
        Save form
      </button>
    </form>
  );
}
