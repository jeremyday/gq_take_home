import * as React from 'react';
import { useEffect, useState } from 'react';
import { getIncentives } from '@api/endpoints';
import { Redeem } from './Redeem';

export const CandidateApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Incentive[]>(null);

  useEffect(() => {
    getIncentives(true)
      .then(incentives => {
        setData(incentives);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="px-12 py-6">
        <a href="/" className="hover:bg-gray-100 bg-gray-200 rounded-md px-4 py-2">Back</a>
      </div>

      <div className="px-12 py-6">
        <h1 className="text-2xl font-bold mb-6">Redeem Incentive</h1>

        {loading && <span>Loading...</span>}

        {!loading && <Redeem data={data} />}
      </div>
    </>
  );
};
