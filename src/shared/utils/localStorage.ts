export const resetLocalGame = () => {
  localStorage.removeItem("bgio_metadata");
  localStorage.removeItem("bgio_state");
  localStorage.removeItem("bgio_initial");
  localStorage.removeItem("bgio_log");
};
