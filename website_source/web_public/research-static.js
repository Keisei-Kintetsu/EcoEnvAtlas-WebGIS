const select = document.querySelector("#languageSelect");
const lang = localStorage.getItem("rsei-viewer-lang") || "zh_cn";

if (select) {
  select.value = lang;
  select.addEventListener("change", () => {
    localStorage.setItem("rsei-viewer-lang", select.value);
  });
}
