# Supply Chain Traceability for PPE and Critical Supplies (SCT-PPE)

A blockchain-based solution for ensuring authenticity, quality, and efficient distribution of personal protective equipment and other critical medical supplies.

## Overview

The Supply Chain Traceability for PPE and Critical Supplies (SCT-PPE) platform leverages blockchain technology to address critical challenges in the medical supply chain, including counterfeit products, quality assurance, and efficient allocation during emergencies. By creating immutable records at each step of the supply chain, this system enables verification of manufacturer legitimacy, product quality, equitable distribution, and end-user authentication.

## System Architecture

The SCT-PPE platform consists of four primary smart contracts:

1. **Manufacturer Verification Contract**
    - Validates and registers legitimate producers of medical supplies
    - Maintains manufacturing facility credentials and certifications
    - Tracks production capacity and historical performance
    - Interfaces with regulatory databases and industry associations
    - Supports auditing and inspection results storage

2. **Quality Certification Contract**
    - Confirms compliance with safety standards and regulatory requirements
    - Records testing methodologies and quality assessment results
    - Manages certification workflows and approval chains
    - Tracks batch/lot numbers and production dates
    - Stores quality inspection documentation and test reports

3. **Allocation Contract**
    - Manages distribution during shortages or emergencies
    - Implements priority algorithms based on need and criticality
    - Tracks inventory levels across the supply chain
    - Coordinates distribution to healthcare facilities
    - Supports government allocation directives during crises

4. **Authenticity Verification Contract**
    - Allows verification of genuine products by end-users and distributors
    - Generates and manages unique product identifiers
    - Provides product provenance tracing from manufacturer to end-user
    - Flags potential counterfeit products in the supply chain
    - Supports recall management and affected product tracking

## Key Features

- **End-to-End Traceability**: Complete visibility from production to end-user
- **Counterfeit Prevention**: Cryptographic verification of genuine medical supplies
- **Regulatory Compliance**: Built-in adherence to regional safety standards
- **Emergency Response**: Adaptive distribution protocols for crisis situations
- **Quality Assurance**: Immutable quality testing records and certification
- **Last-Mile Verification**: Mobile-friendly authentication for healthcare providers

## Getting Started

### Prerequisites

- Node.js v16+
- Truffle framework
- Ganache (for local development)
- Web3.js
- Metamask or similar Ethereum wallet

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-organization/sct-ppe.git
   cd sct-ppe
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Compile the smart contracts:
   ```
   truffle compile
   ```

4. Deploy to local development blockchain:
   ```
   truffle migrate --network development
   ```

### Configuration

1. Configure the network settings in `truffle-config.js` for your target deployment network
2. Set up environment variables for API keys and external data sources
3. Configure regulatory standards in `config/compliance-standards.json`

## Usage

### For Manufacturers

```javascript
// Example: Registering as a verified manufacturer
const manufacturerContract = await ManufacturerVerification.deployed();
await manufacturerContract.registerManufacturer(companyInfo, certifications, facilityDetails);

// Example: Registering a new production batch
const qualityContract = await QualityCertification.deployed();
await qualityContract.registerProductionBatch(productId, batchNumber, quantityProduced, productionDate);
```

### For Testing Labs and Certifiers

```javascript
// Example: Submitting quality testing results
const qualityContract = await QualityCertification.deployed();
await qualityContract.submitTestResults(batchId, testingProtocol, results, certifierId);

// Example: Issuing certification
await qualityContract.issueCertification(batchId, standardsMetList, expirationDate, certificateHash);
```

### For Distributors and Health Authorities

```javascript
// Example: Requesting allocation during shortage
const allocationContract = await Allocation.deployed();
await allocationContract.requestAllocation(facilityId, productId, quantity, priorityLevel, justification);

// Example: Confirming receipt of supplies
await allocationContract.confirmDelivery(shipmentId, receivedQuantity, condition, receiverSignature);
```

### For Healthcare Providers and End Users

```javascript
// Example: Verifying product authenticity
const authenticityContract = await AuthenticityVerification.deployed();
const verificationResult = await authenticityContract.verifyProduct(productId, serialNumber);

// Example: Reporting suspected counterfeit
await authenticityContract.reportCounterfeit(productId, serialNumber, evidenceHash, reporterInfo);
```

## Mobile Verification

The platform includes a mobile application for on-the-spot verification:

- QR code scanning of individual PPE items
- NFC tag reading for bulk package authentication
- Offline verification capabilities for remote locations
- Alert system for counterfeit or recalled products

## Security Considerations

- **Physical-Digital Bridge**: Tamper-evident packaging integrated with digital certificates
- **Access Control**: Role-based permissions for different supply chain participants
- **Smart Contract Auditing**: Regular security audits required
- **Data Privacy**: HIPAA-compliant data handling for healthcare allocations
- **Reliable Oracles**: Verified data sources for external information

## Testing

Run the test suite to verify contract functionality:

```
truffle test
```

Test coverage includes:
- Manufacturer registration and verification
- Quality testing and certification workflows
- Allocation algorithms under various shortage scenarios
- Authenticity verification and counterfeit detection

## Emergency Response Mode

The platform includes special functionality for pandemic or emergency situations:

- Accelerated verification protocols for crisis manufacturing
- Dynamic allocation algorithms based on regional outbreak severity
- Integration with emergency management systems
- Temporary certification pathways for rapid production scaling
- Cross-border coordination for international aid

## Deployment

### Testnet Deployment

For testing on Ethereum testnets:

```
truffle migrate --network sepolia
```

### Production Deployment

For deploying to production networks:

```
truffle migrate --network mainnet
```

## Integration APIs

RESTful APIs are available for integration with:
- Hospital inventory management systems
- Government emergency response platforms
- Manufacturing quality control systems
- Regulatory compliance databases
- Logistics and shipping tracking systems

## Analytics Dashboard

A web-based dashboard provides insights into:
- Supply chain bottlenecks and delivery performance
- Counterfeit detection patterns and hotspots
- Quality compliance metrics by manufacturer
- Regional supply-demand gaps
- Allocation efficiency during shortages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/your-organization/sct-ppe](https://github.com/your-organization/sct-ppe)

## Acknowledgments

- OpenZeppelin for secure smart contract libraries
- Medical regulatory authorities for standards guidance
- Healthcare institutions for testing and feedback
- Emergency response coordinators for allocation protocol development
