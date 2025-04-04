;; manufacturer-verification.clar
;; This contract validates legitimate producers of PPE and critical supplies

(define-data-var contract-owner principal tx-sender)

;; Map to store verified manufacturers
(define-map verified-manufacturers principal
  {
    name: (string-utf8 100),
    registration-number: (string-utf8 50),
    verified: bool,
    verification-date: uint
  }
)

;; Public function to register a new manufacturer (only contract owner)
(define-public (register-manufacturer
    (manufacturer-address principal)
    (name (string-utf8 100))
    (registration-number (string-utf8 50)))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100))
    (asserts! (is-none (map-get? verified-manufacturers manufacturer-address)) (err u101))

    (map-set verified-manufacturers manufacturer-address
      {
        name: name,
        registration-number: registration-number,
        verified: true,
        verification-date: block-height
      }
    )
    (ok true)
  )
)

;; Public function to revoke manufacturer verification
(define-public (revoke-manufacturer (manufacturer-address principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100))
    (asserts! (is-some (map-get? verified-manufacturers manufacturer-address)) (err u102))

    (map-delete verified-manufacturers manufacturer-address)
    (ok true)
  )
)

;; Read-only function to check if a manufacturer is verified
(define-read-only (is-verified-manufacturer (manufacturer-address principal))
  (match (map-get? verified-manufacturers manufacturer-address)
    manufacturer-data (ok (get verified manufacturer-data))
    (err u102)
  )
)

;; Read-only function to get manufacturer details
(define-read-only (get-manufacturer-details (manufacturer-address principal))
  (map-get? verified-manufacturers manufacturer-address)
)

;; Function to transfer contract ownership
(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100))
    (var-set contract-owner new-owner)
    (ok true)
  )
)
