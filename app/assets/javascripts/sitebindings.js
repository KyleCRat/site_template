///////////////////////////////////////////////////
// SiteBindings is the global function object
//   used to keep things organized and safe to
//   call while using turbolinks
///////////////////////////////////////////////////
window.SiteBindings = {
  page: {
  },
  session: {
    pagesVisited: 1
  },
  logging: true,
  isLoading: true   // Set the inital load state of the site
};
