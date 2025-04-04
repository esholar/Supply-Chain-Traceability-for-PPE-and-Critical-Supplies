;; authenticity-verification.clar
;; This contract allows confirmation of genuine PPE and critical supply products

(define-data-var contract-owner principal tx-sender)

;; Map to store product batches with authenticity information
(define-map product-batches
  {
    batch-id: (string-utf8 50)
  }
  {
    manufacturer: principal,
    product-id: (string-utf8 50),
    production-date: uint,
    quantity: uint,
    verification-code: (buff 32)
  }
)

;; Map to track verification attempts
(define-map verification-history
  {
    batch-id: (string-utf8 50),
    verifier: principal
  }
  {
    timestamp: uint,
    result: bool
  }
)

;; Public function to register a product batch (manufacturer only)
(define-public (register-batch
    (batch-id (string-utf8 50))
    (product-id (string-utf8 50))
    (production-date uint)
    (quantity uint)
    (verification-code (buff 32)))
  (begin
    (asserts! (is-none (map-get? product-batches { batch-id: batch-id })) (err u101))

    (map-set product-batches
      { batch-id: batch-id }
      {
        manufacturer: tx-sender,
        product-id: product-id,
        production-date: production-date,
        quantity: quantity,
        verification-code: verification-code
      }
    )
    (ok true)
  )
)

;; Public function to verify product authenticity
(define-public (verify-product (batch-id (string-utf8 50)) (verification-code (buff 32)))
  (begin
    (asserts! (is-some (map-get? product-batches { batch-id: batch-id })) (err u102))

    (match (map-get? product-batches { batch-id: batch-id })
      batch-data
        (begin
          (map-set verification-history
            { batch-id: batch-id, verifier: tx-sender }
            {
              timestamp: block-height,
              result: (is-eq verification-code (get verification-code batch-data))
            }
          )
          (ok (is-eq verification-code (get verification-code batch-data)))
        )
      (err u102)
    )
  )
)

;; Read-only function to get batch details
(define-read-only (get-batch-details (batch-id (string-utf8 50)))
  (map-get? product-batches { batch-id: batch-id })
)

;; Read-only function to get verification history
(define-read-only (get-verification-history (batch-id (string-utf8 50)) (verifier principal))
  (map-get? verification-history { batch-id: batch-id, verifier: verifier })
)

;; Function to transfer contract ownership
(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u100))
    (var-set contract-owner new-owner)
    (ok true)
  )
)
