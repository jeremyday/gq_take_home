function handleResponse(response) {
  if(response.ok) {
    return response.json();
  }

  return null;
}

export const createIncentive = async (params: Partial<Incentive>): Promise<Incentive[]> => {
  const response = await fetch('/api/incentives/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  });

  return await handleResponse(response);
};

export const getIncentives = async (unredeemed = false): Promise<Incentive[]> => {
  const parameters = unredeemed ? '?unredeemed=true' : ''
  const response = await fetch(`/api/incentives${parameters}`);

  return await handleResponse(response);
};

export const newIncentive = async (): Promise<Incentive> => {
  const response = await fetch('/api/incentives/new');

  return await handleResponse(response);
};

export const updateIncentive = async (id: number, params: Partial<Incentive>): Promise<Incentive> => {
  const response = await fetch(`/api/incentives/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  return await handleResponse(response);
};
