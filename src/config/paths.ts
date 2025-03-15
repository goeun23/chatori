export const paths = {
  auth: {
    login : {
      path : '/auth/login', 
      getHref : (redirectTo?: string|null | undefined) => 
        `/auth/login${redirectTo ? `?redirectTo=${redirectTo}` : ''}`,
    },

  },
  
} as const;
