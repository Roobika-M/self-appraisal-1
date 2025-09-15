# TODO for Faculty Appraisal Enhancement

## Completed
- Updated `app.py` to include additional faculty details (designation, dept, empid) in appraisal history.
- Modified upload route in `app.py` to save these additional details.
- Updated `Dashboard.tsx` to fetch and display these additional details from backend.
- Added download buttons for PDF and Word files in Dashboard.
- Ensured scores are correctly mapped and displayed in Dashboard.
- Fixed overall score calculation in Dashboard.tsx to use `data.selfm` instead of `data.self`.

## Next Steps
- Test the full upload, processing, and download flow end-to-end.
- Verify that additional faculty details appear correctly in the frontend.
- Confirm that generated DOCX and PDF files contain correct data.
- Add error handling and user feedback improvements if needed.
- Consider adding multiple faculty records support in frontend if backend supports it.
- Review and optimize performance if necessary.

## Notes
- Backend runs on localhost:5000, frontend on localhost:8080.
- Ensure CORS and credentials are properly configured for fetch requests.
