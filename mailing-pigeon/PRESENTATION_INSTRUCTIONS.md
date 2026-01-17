# Converting Webpage to Presentation

I've created an HTML file that you can convert to PowerPoint or Google Slides.

## Option 1: Google Slides (Easiest)

1. **Open Google Slides**: Go to [slides.google.com](https://slides.google.com)
2. **Import HTML**:
   - Click "File" → "Import slides"
   - Choose "Upload" tab
   - Upload `presentation_slides.html`
   - Google Slides will convert it automatically

3. **Or Print to PDF then import**:
   - Open `presentation_slides.html` in Chrome/Edge
   - Press `Cmd+P` (Mac) or `Ctrl+P` (Windows)
   - Select "Save as PDF"
   - In Google Slides: File → Import → Upload the PDF

## Option 2: PowerPoint

### Method A: From HTML
1. Open `presentation_slides.html` in Microsoft Edge or Chrome
2. Press `Cmd+P` / `Ctrl+P` → Print
3. Choose "Save as PDF"
4. Open PowerPoint → Insert → Slides from → PDF
5. Select your PDF file

### Method B: Manual Import
1. Open PowerPoint
2. Create a new presentation
3. For each slide in `presentation_slides.html`:
   - Copy the content
   - Create a new slide
   - Paste and format

## Option 3: Use Python Script (Advanced)

If you have Python installed and can install packages:

```bash
cd "/Users/nik/Downloads/Storytelling Page/mailing-pigeon"
pip3 install --user beautifulsoup4 python-pptx
python3 generate_presentation.py
```

This will create `MailingPigeon_Presentation.pptx` automatically.

## File Created

- **`presentation_slides.html`** - Ready-to-import HTML presentation (14 slides)
- **`generate_presentation.py`** - Python script for automated conversion (requires dependencies)

## Slide Breakdown

1. Hero - "The mission was impossible..."
2. Mission - "And still, the pigeon flew"
3. Cher Ami Portrait
4. Injuries - "He flew anyway"
5. Hospital Scene
6. The Reason
7. Email Systems Transition
8. MailingPigeon Intro
9. Capabilities Title
10. Capabilities Grid (6 cards)
11. Like Cher Ami
12. Finish the Job
13. Finale
14. Logo Slide

All images are referenced from the same directory, so make sure images are in place when importing.
