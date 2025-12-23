import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/navigation';
import { updateSession } from '@/lib/supabase/middleware';
import { NextRequest } from 'next/server';
 
const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  await updateSession(request);
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ar|en)/:path*']
};
