"use client"
import React, { ChangeEvent, useState, useId } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@components/ui/input";
import { LoadingIcon, ErrorIcon, ExclamationIcon } from "@components/ui/Icons";
import { InternalLink } from "./myLink";
import { OptionProps } from "@/types/dbOperation";

export function Button({
  children, cls, onClick,
}: {
  children: React.ReactNode,
  cls?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
}) {

  return (
    <button 
      type="button"
      className={ `w-full rounded shadow p-2 bg-slate-900 text-slate-50 hover:bg-slate-600 disabled:bg-slate-600 ${ cls }`}
      onClick={ onClick }
    >
      { children }
    </button>
  )
}

export function SubmitButton({
  children, cls
}: {
  children: React.ReactNode,
  cls?: string
}) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={ pending }
      className={ `w-full rounded shadow p-2 bg-slate-900 text-slate-50 hover:bg-slate-600 disabled:bg-slate-600 ${ cls }`}
    >
      {pending ? 
        <span
          className="w-full flex justify-center"
        >
          <LoadingIcon width={24} height={24} className="animate-spin fill-slate-50"/>
        </span>
        : 
        children 
      }
    </button>
  )
}

export function InputDiv({
  type, name, displayName, initialValue, error, disabled, onChange
}: {
  type: "text" | "email" | "number",
  name: string,
  displayName: string,
  initialValue: string,
  error: string | null,
  disabled?: boolean,
  onChange?: (value: string) => void;
}) {
  const [ value, setValue ] = useState<string>(initialValue);
  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) onChange(newValue);
  }
  return (
    <div
      className="mt-2 px-1"
    >
      <label htmlFor={ name }>{ displayName }</label>
      <Input 
        type={ type }
        defaultValue={ value || "" }
        name={ name }
        disabled={ disabled }
        onChange={ handleChange }
      />
      <ErrorTip 
        flag={ error != null}
        message={ error || "" }
      />
    </div>
  );
}

export function CheckBoxDiv({
  name, 
  trueDisplayName, 
  falseDisplayName, 
  initialChecked, 
  value, 
  error, 
  disabled,
  onChange
}: {
  name: string,
  trueDisplayName: string,
  falseDisplayName: string,
  initialChecked: boolean,
  value: string,
  error: string | null,
  disabled?: boolean,
  onChange?: (checked: boolean) => void;
}) {
  const [ isChecked, setIsChecked ] = useState<boolean>(initialChecked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const newCheckedState = e.target.checked;
    setIsChecked(newCheckedState);
    if (onChange) onChange(newCheckedState);
  }
  return (
    <div
      className="mt-2 p-2 h-full flex flex-col justify-end"
    >
      <div
        className={`relative flex justify-start items-center gap-2 p-2 rounded border cursor-pointer ${isChecked ? "bg-sky-100" : ""} group`}
      >
        <Input 
          type="checkbox"
          defaultValue={ value || "" }
          name={ name }
          disabled={ disabled }
          checked={ isChecked }
          className="h-4 w-4"
          onChange={ handleChange }
        />
        <label 
          htmlFor={ name }
          className="cursor-pointer"
        >
          { isChecked ? trueDisplayName : falseDisplayName }
        </label>
      </div>
      <ErrorTip 
        flag={ error != null}
        message={ error || "" }
      />
    </div>
  );
}

export function RadioDiv({
  legend, id, name, defaultValue, onChange, radios, error, message , cls
}: {
  legend: string,
  id: string,
  name: string,
  defaultValue?: string,
  onChange?: (value: string) => void,
  radios: {
    value: string, 
    displayName: React.ReactNode,
  }[],
  error: boolean,
  message: string,
  cls?: string;
}) {
  const [ selected, setSelected ] = useState<string>(defaultValue || "");
  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  }
  return (
    <div>
      <fieldset
        className={ `mt-2 p-2 border rounded ${cls}` }
      >
        <legend>{ legend }</legend>
        { 
          radios.map((radio, index) => {
            const isSelected = selected == radio.value;
            return (
              <div
                className="flex items-center gap-2"
                key={ index }
              >
                <input 
                  type="radio"
                  name={ name }
                  id={ `${id}${ index }` }
                  checked={ isSelected }
                  onChange={ handleChange }
                  value={ radio.value }
                  className="sr-only"
                />
                <label
                  htmlFor={ `${id}${ index }` }
                  className={`
                    block p-1 px-2 rounded-lg border cursor-pointer
                    transition-all duration-200 ease-in-out
                    ${isSelected 
                      ? 'bg-blue-50 border-blue-500 text-blue-700 font-medium shadow-sm' 
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  { radio.displayName }
                </label>
              </div>
            )
          })
        }
      </fieldset>
      <ErrorTip
        flag={ error }
        message={ message }
      />
    </div>
  )
}

export function SelectDiv({
  label, 
  name, 
  options, 
  defaultValue, 
  onChange, 
  required, 
  cls, 
  disabled, 
  error, 
  message, 
  size
}: {
  label?:string,
  name: string,
  options: OptionProps[],
  defaultValue?: string,
  onChange?: (value: string) => void,
  required?: boolean,
  cls?: string;
  disabled?: boolean,
  error: boolean,
  message: string,
  size?: number,
}) {
  const [value, setValue] = useState(defaultValue || "");
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <div
        className="w-full"
      >
        {
          label && (
            <label htmlFor={ id } className="mr-2">
              { label }
            </label>
          )
        }
        <select
          id={ id }
          name={ name }
          value={ value }
          onChange={ handleChange }
          className={ `rounded-md border p-2 shadow ${ cls }`}
          disabled={ disabled }
          required={ required }
          size={ size }
        >
          <option value="" disabled>選択してください。</option>
          {
            options.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="hover:bg-slate-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                { option.label }
              </option>
            ))
          }
        </select>
      </div>
      <ErrorTip flag={ error } message={ message }/>
    </div>
  )
}
export function RichSelectDiv({
  label, 
  name, 
  options, 
  defaultValue, 
  onChange, 
  cls, 
  error, 
  message, 
  size
}: {
  label?:string,
  name: string,
  options: OptionProps[],
  defaultValue?: string,
  onChange?: (value: string) => void,
  cls?: string;
  error: boolean,
  message: string,
  size?: number,
}) {
  const [ value , setValue ] = useState(defaultValue || "");
  const handleClick = (value: string) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  }
  return (
    <>
    <div
      className="w-full"
    >
      <input 
        type="hidden" 
        name={ name } 
        value={ value }
      />
      {
        label && <p className="font-bold">{ label }</p>
      }
      <div
        className={`overflow-y-scroll flex flex-col justify-start gap-1 ${ cls }`}
        style={{ height: `${size}px`}}
      >
        {
          options.map(option => {
            return (
              <button
                type="button"
                key={ option.value }
                onClick={ () => handleClick(option.value) }
                className={`hover:bg-slate-100 ${ option.value == value ? "bg-blue-100" : ""}`}
              >
                { option.label }
              </button>
            )
          })
        }
      </div>
    </div>
    <ErrorTip flag={ error } message={ message }/>
    </>
  )
}

export function FormAlert({
  flag, message, href, type
}: {
  flag: boolean, 
  message: string,
  href?: string // 実装中のため、hrefを必ず指定する。
  type: "success" | "error"
}) {
  const [display, setDisplay] = useState("block");
  const handleClick = () => {
    setDisplay("hidden");
  }
  if (flag) {
    if (href) {
      return (
        <div
          className={ `z-50 fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center` }
        >
          <div
            className={`bg-${ type == "success" ? "green" : "yellow" }-100 text-${ type == "success" ? "green" : "yellow" }-500 p-4 rounded`}
          >
            <p
              className="m-2 flex items-center"
            >
            { type == "success" ? 
              <ExclamationIcon width={16} height={16} className={`fill-green-500`} /> 
              : 
              <ErrorIcon width={16} height={16} className={`fill-yellow-500`} /> 
            }
            { message }
            </p>
            <div
              className="flex justify-end"
            >
              <InternalLink href={ href } text="閉じる"/>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div
          className={ `${display} z-50  fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center` }
        >
          <div
            className={`bg-${ type == "success" ? "green" : "yellow" }-100 text-${ type == "success" ? "green" : "yellow" }-500 p-4 rounded`}
          >
            <p>
            { type == "success" ? 
              <ExclamationIcon width={16} height={16} className={`fill-green-500`} /> 
              : 
              <ErrorIcon width={16} height={16} className={`fill-yellow-500`} /> 
            }
            { message }
            </p>
            <button
              onClick={ handleClick }
            >
              閉じる
            </button>
          </div>
        </div>
      )
      
    } 
  }
  return (
    <></>
  )
}

export function SuccessTip({
  success, message
}: {
  success: boolean, message: string
}) {
  if (success) {
    return (
      <p
        className="flex items-center p-1 rounded bg-green-100 text-green-500 text-sm mt-1"
      >
        <span
          className="pr-1"
        >
          <ExclamationIcon width={16} height={16} className="fill-green-500" />
        </span>
        { message }
      </p>
    );
  }
  return (
    <></>
  )
}

export function ErrorTip({
  flag, message
}: {
  flag: boolean, message: string
}) {
  if (flag) {
    return (
      <p
        className="flex items-center p-1 rounded bg-yellow-100 text-yellow-500 text-sm mt-1"
      >
        <span
          className="pr-1"
        >
          <ErrorIcon width={16} height={16} className="fill-yellow-500" />
        </span>
        { message }
      </p>
    );
  }
  return (
    <></>
  )
}