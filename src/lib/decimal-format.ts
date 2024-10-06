export function formatDecimal(value: FormDataEntryValue): number {
    return Number(String(value)
            .replace(".", "")
            .replace(",", ".")
            .replace('R$ ',''))
}