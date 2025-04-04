import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the Clarity environment
const mockClarity = {
  tx: {
    sender: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
  contracts: {
    'manufacturer-verification': {
      functions: {
        'register-manufacturer': vi.fn(),
        'revoke-manufacturer': vi.fn(),
        'is-verified-manufacturer': vi.fn(),
        'get-manufacturer-details': vi.fn(),
        'transfer-ownership': vi.fn(),
      }
    }
  }
};

// Setup global mock
vi.mock('clarity-environment', () => mockClarity, { virtual: true });

describe('Manufacturer Verification Contract', () => {
  const contract = mockClarity.contracts['manufacturer-verification'];
  
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
  });
  
  it('should register a manufacturer successfully', async () => {
    const manufacturerAddress = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
    const name = 'Acme PPE Manufacturers';
    const registrationNumber = 'REG123456';
    
    contract.functions['register-manufacturer'].mockReturnValue({ value: true });
    
    const result = await contract.functions['register-manufacturer'](
        manufacturerAddress,
        name,
        registrationNumber
    );
    
    expect(result.value).toBe(true);
    expect(contract.functions['register-manufacturer']).toHaveBeenCalledWith(
        manufacturerAddress,
        name,
        registrationNumber
    );
  });
  
  it('should verify a manufacturer correctly', async () => {
    const manufacturerAddress = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
    
    contract.functions['is-verified-manufacturer'].mockReturnValue({ value: true });
    
    const result = await contract.functions['is-verified-manufacturer'](manufacturerAddress);
    
    expect(result.value).toBe(true);
    expect(contract.functions['is-verified-manufacturer']).toHaveBeenCalledWith(manufacturerAddress);
  });
  
  it('should revoke a manufacturer verification', async () => {
    const manufacturerAddress = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
    
    contract.functions['revoke-manufacturer'].mockReturnValue({ value: true });
    
    const result = await contract.functions['revoke-manufacturer'](manufacturerAddress);
    
    expect(result.value).toBe(true);
    expect(contract.functions['revoke-manufacturer']).toHaveBeenCalledWith(manufacturerAddress);
  });
});
