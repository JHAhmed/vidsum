# VidSum – YouTube Video Summarizer

VidSum is a video/lecture summarization tool built with [SvelteKit](https://kit.svelte.dev/) that lets you quickly generate and save summaries of YouTube videos. Paste a YouTube link, choose your summary preferences, and get a concise, readable summary—perfect for note-taking, studying, or sharing insights.

## Features

- **YouTube Summarization:** Paste any YouTube URL and get an AI-generated summary.
- **Customizable Output:** Choose summary length (Short, Medium, Long) and video type (Education, Entertainment, Others).
- **Save Notes:** Add a title and save your summaries for later reference.
- **Authentication Ready:** Integrates with Kinde Auth and Supabase for secure user management (extend as needed).
- **Modern UI:** Built with TailwindCSS and Bits UI for a clean, customizable interface.
- **Scalable Structure:** Organized for easy extension and production readiness.

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [Supabase](https://supabase.com/) (backend, storage, auth)
- [Kinde Auth](https://kinde.com/) (authentication)
- [TailwindCSS](https://tailwindcss.com/) (styling)
- [Bits UI](https://bits-ui.com/) (UI components)
- [marked](https://marked.js.org/) (Markdown rendering)
- [svelte-sonner](https://github.com/emilkowalski/svelte-sonner) (toasts/notifications)

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/JHAhmed/vidsum.git
    cd vidsum
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    ```

3. **Configure environment variables:**
    - Copy `.env.example` to `.env` and fill in your Supabase credentials.

4. **Run the development server:**
    ```bash
    pnpm run dev
    ```

5. **Open your browser:**
    - Visit [http://localhost:5173](http://localhost:5173)

## Usage

1. Paste a YouTube video URL into the input field.
2. Select your desired summary length and video type.
3. Click **Get Summary** to generate a summary.
4. (Optional) Add a title and click **Save Summary** to store your note.

<!-- ## Customization

- **UI:** Modify or extend Bits UI components and TailwindCSS styles.
- **Auth:** Configure Kinde and Supabase in your `.env` file.
- **Backend:** Extend Supabase or add new API endpoints for more features. -->

Built with ❤️ using SvelteKit, Supabase, TailwindCSS, and Bits UI.