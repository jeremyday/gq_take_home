import * as React from 'react';
import { useEffect, useState } from 'react';
import { getIncentives } from '@api/endpoints';
import { IncentiveForm } from './IncentiveForm';

export const ResearcherApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Incentive[]>(null);

  useEffect(() => {
    getIncentives()
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
        <h1 className="text-2xl font-bold mb-6">Setup Incentive</h1>
        <p className="mb-4">Enter the coupon code for the candidate to receive:</p>

        {loading && <span>Loading...</span>}

        {!loading && <IncentiveForm data={data} />}
      </div>
    </>
  );
};
