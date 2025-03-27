// Components
import { Calendar } from 'primereact/calendar';
// Images
// Imports
// Styles
import s from './CalendarField.module.scss';

export interface ICalendarFieldProps {
    fieldName: string;
    fieldLabel: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    placeholder?: string;
    disabled?: boolean;
}

export default function CalendarField({
  fieldName, fieldLabel, formik,
  placeholder = "00/00/0000", disabled
}: ICalendarFieldProps) {
    return (
        <main className={s.wrapperMain}>
            <label>{fieldLabel}</label>
            <Calendar
                name={fieldName}
                value={formik.values[fieldName] ? new Date(formik.values[fieldName]) : null}
                onChange={(e) => formik.setFieldValue(fieldName, e.value)}
                placeholder={placeholder}
                className={s.field}
                disabled={disabled}
                showButtonBar
                mask="99/99/9999"
                dateFormat="dd/mm/yy"
                pt={{
                    panel: { className: s.customCalendarPanel },
                    group: { className: s.customCalendarGroup },
                    header: { className: s.customCalendarHeader },
                    previousButton: { className: s.customCalendarButtons },
                    nextButton: { className: s.customCalendarButtons },
                    title: { className: s.customCalendarTitle },
                    monthTitle: { className: s.customCalendarMonthTitle },
                    yearTitle: { className: s.customCalendarYearTitle },
                    weekDay: { className: s.customCalendarWeekDay },
                    day: { className: s.customCalendarDay },
                    dayLabel: { className: s.customCalendarDayLabel },
                    buttonbar: { className: s.customCalendarButtonBar },
                }}
            />
            {formik.touched[fieldName] && formik.errors[fieldName] && (
                <small className={s.errorMessage}>{formik.errors[fieldName]}</small>
            )}
        </main>
    );
}
