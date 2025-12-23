(function ($) {

  $(function () {
    $('.ganban-studio-slide').slick({
      infinite: true,
      dots: false,
      arrows: true,
      autoplay: false,
      centerMode: true,
      centerPadding: '15%',
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerPadding: '20px',
          },
        },
      ],
    });
  });

})(jQuery);

const _lpFlowThreshold = 100;
const _lpFlowScroll = () => {
  const y =
    (document.scrollingElement && document.scrollingElement.scrollTop) ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    0;

  const add = y > _lpFlowThreshold;
  const nodes = document.querySelectorAll('.lp-flow');
  if (!nodes.length) return;
  nodes.forEach(el => el.classList.toggle('show', add));
};

window.addEventListener('load', _lpFlowScroll, false);
window.addEventListener('scroll', _lpFlowScroll, { passive: true });