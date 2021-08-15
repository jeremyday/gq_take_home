import * as React from 'react';
import { useEffect, useState } from 'react';
import { createIncentive, newIncentive } from '@api/endpoints';

interface Props {
  data: Incentive[];
}

export const IncentiveForm: React.FC<Props> = ({ data }) => {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [incentives, setData] = useState<Incentive[]>(data);

  async function setNewInputValue(): Promise<String> {
    const value = await newIncentive();

    if(value) {
      setInputValue(value.code);
    }

    return value.code
  }

  useEffect(setNewInputValue, '');

  async function handleClickSave() {
    setSaving(true);

    const incentives = await createIncentive({ code: inputValue });

    if(incentives) {
      setData(incentives);
      setMessage(`Successfully created code ${inputValue}.`);
      setNewInputValue();

      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage('An error occurred.');
    }

    setSaving(false);
  }

  return (
    <div>
      <div className="flex space-x-2 pb-4">
        <input
          disabled={saving}
          className="text-xl border"
          name="incentive_code"
          onChange={e => setInputValue(e.currentTarget.value)}
          type="text"
          value={inputValue}
        />
        <button
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          disabled={saving}
          onClick={handleClickSave}
        >
          Save
        </button>
      </div>

      {message && <div className="text-gray-600 italic">{message}</div>}

      <h2 className="font-bold mb-6 text-2xl">Existing Incentives</h2>

      {/* NOTE: I wanted to use an IncentiveList component here, but I didn't want to take the time yet to figure out how to handle global- or cross-component state in React.*/}
      <div className="border border-gray-300 border-solid divide-gray-300 divide-solid divide-y rounded">
        {incentives.map(incentive => {
          const redeemed = incentive.redeemed_at ? 'Redeemed' : '';

          return (
            <div className="flex items-center p-2 divide-gray-300 divide-solid divide-x">
              <div className="font-bold text-center text-green-600 px-2 w-32">{redeemed}</div>
              <div className="px-2">{incentive.code}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
