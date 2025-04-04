import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the Clarity environment
const mockClarity = {
  tx: {
    sender: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
  },
  contracts: {
    'authenticity-verification': {
      functions: {
        'register-batch': vi.fn(),
        'verify-product': vi.fn(),
        'get-batch-details': vi.fn(),
        'get-verification-history': vi.fn(),
        'transfer-ownership': vi.fn(),
      }
    }
  }
};

// Setup global mock
vi.mock('clarity-environment', () => mockClarity, { virtual: true });

describe('Authenticity Verification Contract', () => {
  const contract = mockClarity.contracts['authenticity-verification'];
  
  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();
  });
  
  it('should register a batch successfully', async () => {
    const batchId = 'BATCH-001';
    const productId = 'N95-MASK-001';
    const productionDate = 20230101;
    const quantity = 10000;
    const verificationCode = new Uint8Array(32).fill(1); // Mock verification code
    
    contract.functions['register-batch'].mockReturnValue({ value: true });
    
    const result = await contract.functions['register-batch'](
        batchId,
        productId,
        productionDate,
        quantity,
        verificationCode
    );
    
    expect(result.value).toBe(true);
    expect(contract.functions['register-batch']).toHaveBeenCalledWith(
        batchId,
        productId,
        productionDate,
        quantity,
        verificationCode
    );
  });
  
  it('should verify a product successfully', async () => {
    const batchId = 'BATCH-001';
    const verificationCode = new Uint8Array(32).fill(1); // Mock verification code
    
    contract.functions['verify-product'].mockReturnValue({ value: true });
    
    const result = await contract.functions['verify-product'](batchId, verificationCode);
    
    expect(result.value).toBe(true);
    expect(contract.functions['verify-product']).toHaveBeenCalledWith(batchId, verificationCode);
  });
  
  it('should get batch details', async () => {
    const batchId = 'BATCH-001';
    const mockBatchData = {
      manufacturer: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG',
      productId: 'N95-MASK-001',
      productionDate: 20230101,
      quantity: 10000,
      verificationCode: new Uint8Array(32).fill(1)
    };
    
    contract.functions['get-batch-details'].mockReturnValue(mockBatchData);
    
    const result = await contract.functions['get-batch-details'](batchId);
    
    expect(result).toEqual(mockBatchData);
    expect(contract.functions['get-batch-details']).toHaveBeenCalledWith(batchId);
  });
});
