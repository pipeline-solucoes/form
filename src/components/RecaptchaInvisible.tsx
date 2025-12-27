'use client';

import React, { useRef, useImperativeHandle, forwardRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export type RecaptchaInvisibleRef = {
  execute: () => Promise<string | null>;
};

type RecaptchaInvisibleProps = {
  siteKey: string;
  onError?: (error: unknown) => void;
};

const RecaptchaInvisible = forwardRef<RecaptchaInvisibleRef, RecaptchaInvisibleProps>(
  ({ siteKey, onError }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const executeRecaptcha = useCallback(async (): Promise<string | null> => {
      try {
        if (recaptchaRef.current) {
          const token = await recaptchaRef.current.executeAsync();
          recaptchaRef.current.reset();
          return token;
        }
        return null;
      } catch (error) {
        if (onError) onError(error);
        return null;
      }
    }, [onError]);

    useImperativeHandle(ref, () => ({
      execute: executeRecaptcha,
    }));

    return <ReCAPTCHA sitekey={siteKey} size="invisible" badge="bottomleft" ref={recaptchaRef} />;
  }
);

RecaptchaInvisible.displayName = 'RecaptchaInvisible';

export default RecaptchaInvisible;