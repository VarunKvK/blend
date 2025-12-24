# Blend

A modern, production-ready SaaS starter kit built with Next.js, Supabase, and DoDo Payments.

## 🚀 Features

- **Framework:** Next.js 14/15 (App Router)
- **Database:** Supabase (Postgres)
- **Authentication:** Supabase Auth (Email + Google)
- **Payments:** DoDo Payments (Checkout & Webhooks)
- **Styling:** Tailwind CSS + Shadcn UI
- **Language:** JavaScript

## 🛠 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (or yarn/pnpm)

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd saas-boilerplate
    ``` 

2.  **Install dependencies:**

    ```bash
    npm install
    ```

## ⚙️ Configuration

### 1. Environment Variables

Create a `.env.local` file in the root directory and add the following variables. You can copy the structure below:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here # Required for webhooks

# DoDo Payments Configuration
DODO_PAYMENTS_API_KEY=your-dodo-api-key
DODO_PAYMENTS_WEBHOOK_KEY=your-dodo-webhook-key
DODO_PAYMENTS_RETURN_URL=http://localhost:3000/payment/success # URL to redirect after payment
DODO_PAYMENTS_ENVIRONMENT=test_mode # or live_mode
NEXT_PUBLIC_DODO_PRODUCT_ID=your-product-id # Product ID from DoDo Dashboard

# General
NEXT_PUBLIC_BASE_URL=http://localhost:3000 # Your app's base URL
```

### 2. App Configuration

Open `lib/config.js` to configure your application details and select your payment provider:

```javascript
const config = {
  appName: "Blend",
  // ...
  paymentProvider: "dodo", // Ensure this is set to 'dodo' if using DoDo Payments
  // ...
};
```

### 3. Database Setup (Supabase)

Go to your Supabase project's **SQL Editor** and run the following scripts to set up the necessary tables and triggers.

**Step 1: Create Profiles Table**

This table stores user information and subscription status.

```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_pro boolean default false,
  subscription_id text
);
```

**Step 2: Enable Row Level Security (RLS)**

Secure your data so users can only access their own information.

```sql
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);
```

**Step 3: Handle New User Signups (Trigger)**

Automatically create a profile entry when a new user signs up via Supabase Auth.

```sql
-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

**Step 4: Create Subscriptions Table (Optional)**

If you plan to track detailed subscription history.

```sql
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  status text check (status in ('active', 'cancelled', 'past_due', 'trialing')),
  plan_id text,
  provider text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table subscriptions enable row level security;
create policy "Users can view own subscription." on subscriptions
  for select using ((select auth.uid()) = user_id);
```

## 🏃‍♂️ Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project into Vercel.
3.  Add the **Environment Variables** (from the Configuration section) in the Vercel project settings.
4.  Deploy!

## 📂 Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `lib/`: Utility functions, Supabase client, and configuration.
- `public/`: Static assets.