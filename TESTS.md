# AudMint Testing Strategy

## Automated Tests
We use **Jest** to validate the core business logic of the Audit Engine. This ensures that all cost savings calculations and redundancy detections are numerically defensible.

### Run Backend Tests
```bash
cd backend
npm test
```

### Coverage
| Test Case | Description | Expected Outcome | Status |
| :--- | :--- | :--- | :--- |
| **Plan Downgrade** | Tool = Claude Pro, Use Case = Coding | Recommend Free tier + $20/mo savings | ✅ Passed |
| **Seat Optimization** | 10 seats for 5 person team | Identify 5 extra seats + savings | ✅ Passed |
| **Duplicate Tools** | ChatGPT Plus + Claude Pro | Identify redundancy + keep one | ✅ Passed |
| **Tool Specificity** | Cursor + GitHub Copilot | Recommend canceling Copilot | ✅ Passed |
| **Savings Accuracy** | Multi-recommendation sum | `totalSavingsMonthly` matches sum | ✅ Passed |
| **Optimized Case** | Clean stack (1 tool, 1 seat) | 0 recommendations, 0 savings | ✅ Passed |

## Manual Verification (E2E Flow)

### 1. Persistence Test
- **Action:** Fill out step 1 and step 2 of the Audit Form. Refresh the page.
- **Goal:** Confirm the "Resume where you left off" toast appears and state is restored.

### 2. Search & Select Test
- **Action:** Type "Cur" in the tool search.
- **Goal:** Confirm "Cursor" appears and can be selected.

### 3. API Error Handling
- **Action:** Temporarily disconnect the backend and submit an audit.
- **Goal:** Confirm a user-friendly error message appears in the UI.

### 4. Lead Capture
- **Action:** Enter a valid email on the results page.
- **Goal:** Confirm the "Report sent!" message appears and the shareable link works.

## CI/CD Verification
Every pull request triggers the **GitHub Actions** workflow which runs:
1. `npm run lint` (Frontend)
2. `npm test` (Backend Engine)
3. `npm run build` (Frontend)
