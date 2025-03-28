// Components
import { Calendar } from 'primereact/calendar';
// Images
// Imports
import { addLocale } from 'primereact/api';
import { IUser } from '../../interfaces/users/profile/IUser';
import { FormikProps } from 'formik';
// import { useState } from 'react';
// Styles
import s from './CalendarField.module.scss';

export interface ICalendarFieldProps {
    fieldName: string;
    fieldLabel: string;
    formik: FormikProps<IUser>;
    placeholder?: string;
    disabled?: boolean;
}

export default function CalendarField({
  fieldName, fieldLabel, formik, placeholder = "00/00/0000",
  disabled
}: ICalendarFieldProps) {
    // Functions
    addLocale('pt', {
        firstDayOfWeek: 0,
        dayNames: ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'],
        dayNamesShort: ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthNames: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        monthNamesShort: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        today: 'Hoje',
        clear: 'Limpar'
    });

    return (
        <main className={s.wrapperMain}>
            <label>{fieldLabel}</label>
            <Calendar
                name={fieldName}
                value={formik.values[fieldName as keyof IUser] ? new Date(formik.values[fieldName as keyof IUser] as string) : null}
                onChange={(e) => formik.setFieldValue(fieldName, e.value)}
                placeholder={placeholder}
                className={s.field}
                disabled={disabled}
                showButtonBar
                mask="99/99/9999"
                dateFormat="dd/mm/yy"
                locale="pt"
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
                // footerTemplate={() => (
                //     <div className={s.customCalendarFooter}>
                //         <button
                //             type="button"
                //             className={s.cancelButton}
                //             onClick={() => {
                //                 formik.setFieldValue(fieldName, null);
                //                 setIsCalendarVisible(false);
                //             }}
                //         >
                //             Cancelar
                //         </button>

                //         <button
                //             type="button"
                //             className={s.applyButton}
                //             onClick={() => {
                //                 formik.setFieldValue(fieldName, formik.values[fieldName as keyof IUser]);
                //                 setIsCalendarVisible(false);
                //             }}
                //         >
                //             Aplicar
                //         </button>
                //     </div>
                // )}
            />
            {formik.touched[fieldName as keyof IUser] && formik.errors[fieldName as keyof IUser] && (
                <small className={s.errorMessage}>{formik.errors[fieldName as keyof IUser]}</small>
            )}
        </main>
    );
}
