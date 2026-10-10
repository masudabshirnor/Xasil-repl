// Safe preview adapter: local sample listings only; no production client,
// credentials, network calls, auth sessions, or persistent mutations.
const disabled = {
  message: "This is a read-only XASIL preview.",
  code: "PREVIEW_ONLY",
};

const query = (table) => {
  let writeAttempted = false;
  const builder = {
    select: () => builder,
    eq: () => builder,
    order: () => builder,
    update: () => {
      writeAttempted = true;
      return builder;
    },
    insert: () => {
      writeAttempted = true;
      return builder;
    },
    delete: () => {
      writeAttempted = true;
      return builder;
    },
    then: (resolve, reject) =>
      Promise.resolve(
        writeAttempted
          ? { data: null, error: disabled }
          : { data: [], error: null },
      ).then(resolve, reject),
  };
  return builder;
};

export const supabase = {
  from: () => query(),
  rpc: async () => ({ data: null, error: disabled }),
  auth: {
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe() {} } },
    }),
    signInWithPassword: async () => ({ data: { session: null }, error: disabled }),
    signUp: async () => ({ error: disabled }),
    signOut: async () => ({ error: null }),
  },
  storage: {
    from: () => ({
      upload: async () => ({ error: disabled }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};
