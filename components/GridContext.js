import React from 'react'

export const GridContext = React.createContext({
  editingHeaderId: undefined,
  toggleHeaderName: () => {},
});
