import * as React from 'react';
import { useState } from 'react';
import { redeemIncentive } from '@api/endpoints';

interface Props {
  data: Incentive[];
}
export const Redeem: React.FC<Props> = ({ data }) => {
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleClickRedeem() {
    setSaving(true);

    if(data.length == 0) {
      setMessage(`There are no more codes to redeem! Try back again later. Sorry for the inconvenience.`);

      return;
    }

    const incentive = data.pop();

    redeemIncentive(incentive.id).then(() => setMessage(`Your code is: ${incentive.code}. Thanks for participating in our research!`));

    setSaving(false);
  }

  return (
    <div>
      <div className="pb-4">
        <button
          disabled={saving}
          className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2"
          onClick={handleClickRedeem}
        >
          Redeem
        </button>
      </div>

      {message && (
        <div className="py-4 text-green-600 italic">
          {message}
        </div>
      )}
    </div>
  );
};
