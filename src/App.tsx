import { Combobox } from '@headlessui/react'
import React, { useCallback, useState } from 'react'
import { IconCheck, IconSelector, IconX } from '@tabler/icons-react'

export interface MultiselectOption {
  id: string
  title: string
  description?: string
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function App({
  options,
  onSelect,
  label,
}: {
  options: MultiselectOption[]
  onSelect: (selects: MultiselectOption[]) => void
  label?: string
}) {
  const [selectedOptions, setSelected] = useState<MultiselectOption[]>([])
  const [query, setQuery] = useState<string>('')

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(query.toLowerCase())
  )
  const selectedSet = new Set(selectedOptions.map((s) => s.id))

  const addOption = useCallback(
    (option: MultiselectOption) => {
      setSelected([...selectedOptions, option])
      onSelect([...selectedOptions, option])
    },
    [selectedOptions, onSelect]
  )

  const removeOption = useCallback(
    (option: MultiselectOption) => {
      setSelected(selectedOptions.filter((o) => o.id !== option.id))
      onSelect(selectedOptions.filter((o) => o.id !== option.id))
    },
    [selectedOptions, onSelect]
  )

  const onClick = useCallback(
    (option: MultiselectOption) => {
      if (selectedSet.has(option.id)) {
        removeOption(option)
      } else {
        addOption(option)
      }
    },
    [selectedSet]
  )

  function SelectedOption({ option }: { option: MultiselectOption }) {
    return (
      <div className="flex h-fit w-fit items-center gap-2 whitespace-nowrap rounded-md border-[0.5px] border-gray-500 p-1 pl-2 text-sm text-gray-900">
        {option.title}
        <IconX
          className="h-4 w-4 cursor-pointer text-gray-500"
          onClick={() => removeOption(option)}
        />
      </div>
    )
  }

  // function onChange(names: string);

  return (
    <Combobox value={selectedOptions} multiple onChange={(options) => setSelected(options)}>
      {({ value }) => (
        <>
          <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </Combobox.Label>
          <div className="relative">
            <div className="flex w-full flex-row items-center gap-2 rounded-md border-0 bg-white py-3 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <div className="flex flex-row gap-2">
                {value && value.map((o) => <SelectedOption option={o} key={o.id} />)}
              </div>
              <Combobox.Input
                className="text-md w-full grow border-none p-0 focus:outline-none focus:ring-transparent"
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <Combobox.Button
              className={
                'focus:bg-grey-50 absolute inset-y-0 right-0 flex rounded-r-md px-2 pt-3 text-gray-600'
              }
            >
              <IconSelector />
            </Combobox.Button>
            <Combobox.Options
              className={
                'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg'
              }
            >
              {filteredOptions.map((o) => (
                <Combobox.Option
                  key={o.id}
                  value={o.title}
                  className={classNames(
                    'relative cursor-pointer select-none',
                    selectedSet.has(o.id) ? 'bg-gray-50' : 'bg-white'
                  )}
                  onClick={() => onClick(o)}
                >
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'flex flex-row items-center justify-between  px-3 py-2'
                      )}
                    >
                      <div className="flex flex-row gap-2">
                        <div className="font-medium text-gray-900">{o.title}</div>
                        <div className="text-sm text-gray-600">{o.description}</div>
                      </div>
                      {selectedSet.has(o.id) && <IconCheck className="text-blue-500" />}
                    </div>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </div>
        </>
      )}
    </Combobox>
  )
}

export default App
