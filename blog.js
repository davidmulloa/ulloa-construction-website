/*
  Ulloa Construction - Blog (static)
  - Renders featured cards on the homepage (element: #blog-featured)
  - Renders a full blog page with filter/search and single-post view (elements: #blog-grid, #blog-post)
*/

(function () {
  "use strict";

  const BLOG_POSTS = [
    {
      slug: "planning-a-kitchen-remodel",
      title: "Planning a Kitchen Remodel: Timeline + Budget Basics",
      date: "2026-01-10",
      category: "Kitchen",
      tags: ["planning", "budget", "timeline"],
      image: "images/gallery-8.jpg",
      excerpt:
        "What impacts cost, how long it usually takes, and how to avoid common surprises.",
      contentHtml: `
        <p>Most kitchen remodel stress comes from two things: unclear scope and unrealistic timing. A clean plan up front keeps the project moving and keeps decisions from piling up once demo starts.</p>

        <h3>Typical kitchen remodel phases</h3>
        <ul>
          <li><strong>Planning + selections:</strong> layout, cabinet style, countertop, tile, plumbing fixtures, and lighting.</li>
          <li><strong>Demo + rough work:</strong> demolition, framing (if needed), plumbing, electrical, and inspections.</li>
          <li><strong>Install:</strong> cabinets, countertops, backsplash, flooring/touch-ups, and finish fixtures.</li>
          <li><strong>Final walkthrough:</strong> punch list and final details.</li>
        </ul>

        <h3>Budget basics (what drives cost)</h3>
        <ul>
          <li><strong>Layout changes:</strong> moving plumbing or walls increases labor and inspections.</li>
          <li><strong>Cabinet level:</strong> stock vs. semi-custom vs. custom makes a big difference.</li>
          <li><strong>Countertops + splash:</strong> material choices and edge/details add up fast.</li>
          <li><strong>Electrical/lighting:</strong> adding cans, under-cabinet lighting, or a panel upgrade can affect budget.</li>
        </ul>

        <p>If you want an itemized quote, the fastest way to get there is to decide your must-haves first (layout, cabinet style, and countertops), then we can build the scope around that.</p>
      `.trim(),
    },
    {
      slug: "bathroom-remodel-mistakes",
      title: "5 Bathroom Remodel Mistakes That Cost Homeowners Money",
      date: "2025-12-12",
      category: "Bathroom",
      tags: ["tips", "waterproofing", "planning"],
      image: "images/gallery-3.jpg",
      excerpt:
        "Small decisions that lead to leaks, delays, and expensive rework—and how to avoid them.",
      contentHtml: `
        <p>Bathrooms are small, but they have a lot going on—waterproofing, ventilation, plumbing, electrical, and tile work. These are the most common mistakes we see homeowners run into.</p>

        <ol>
          <li><strong>Skipping proper waterproofing:</strong> Tile isn’t waterproof—your system behind it is.</li>
          <li><strong>Not planning the layout:</strong> Door swings, shower glass, and clearance around toilets matter.</li>
          <li><strong>Choosing materials that don’t fit the space:</strong> Some stones and finishes need more maintenance than people expect.</li>
          <li><strong>Poor ventilation:</strong> A weak fan (or no ducting) leads to humidity, peeling paint, and mold risk.</li>
          <li><strong>Buying fixtures last minute:</strong> Delays happen when valves, trims, or specialty parts aren’t on site.</li>
        </ol>

        <p>A good bathroom remodel feels simple because the planning is handled early. If you want, we can help you build a selection list so everything arrives on time.</p>
      `.trim(),
    },
    {
      slug: "what-to-expect-remodel-timeline",
      title: "What to Expect During a Remodel Timeline",
      date: "2025-11-05",
      category: "Remodeling",
      tags: ["process", "timeline", "home-prep"],
      image: "images/gallery-6.jpg",
      excerpt:
        "A simple breakdown of phases, inspections, and how we keep the jobsite clean and organized.",
      contentHtml: `
        <p>Every home is different, but most remodels follow the same rhythm. The biggest thing homeowners appreciate is knowing what’s next.</p>

        <h3>How a typical remodel flows</h3>
        <ul>
          <li><strong>Pre-construction:</strong> scope, schedule, materials, and protecting the home.</li>
          <li><strong>Demo:</strong> careful removal and haul-away.</li>
          <li><strong>Rough trades:</strong> plumbing/electrical/HVAC as needed + inspections.</li>
          <li><strong>Install + finishes:</strong> drywall, paint, cabinets, tile, flooring, fixtures.</li>
          <li><strong>Punch list:</strong> final touch-ups and walkthrough.</li>
        </ul>

        <h3>How we keep your home livable</h3>
        <ul>
          <li>Dust containment where needed</li>
          <li>Daily cleanup and organized staging</li>
          <li>Clear communication on what’s happening next</li>
        </ul>

        <p>If you’re living in the house during construction, we’ll help you plan around the loudest/most disruptive days so there are no surprises.</p>
      `.trim(),
    },
  ];

  function formatDate(iso) {
    try {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return iso;
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function postCardHtml(post) {
    return `
      <a href="blog.html#post=${encodeURIComponent(post.slug)}" class="projects-overview-card" data-category="${escapeHtml(
      post.category
    )}" data-title="${escapeHtml(post.title)}" data-tags="${escapeHtml(post.tags.join(" "))}">
        <div class="projects-overview-image">
          <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />
        </div>
        <div class="projects-overview-content">
          <p class="blog-meta">${escapeHtml(post.category)} • ${formatDate(post.date)}</p>
          <h3>${escapeHtml(post.title)}</h3>
          <p>${escapeHtml(post.excerpt)}</p>
        </div>
      </a>
    `.trim();
  }

  function renderFeatured() {
    const host = document.getElementById("blog-featured");
    if (!host) return;

    // If you ever add more posts, this will automatically pull the latest 3
    const featured = [...BLOG_POSTS]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

    host.innerHTML = featured.map(postCardHtml).join("\n");
  }

  function renderBlogIndex() {
    const grid = document.getElementById("blog-grid");
    const postView = document.getElementById("blog-post");
    const search = document.getElementById("blog-search");
    const pills = document.querySelectorAll(".blog-pill");

    if (!grid && !postView) return;

    function showList() {
      if (grid) grid.closest("section").style.display = "block";
      if (postView) postView.closest("section").style.display = "none";
    }

    function showPost() {
      if (grid) grid.closest("section").style.display = "none";
      if (postView) postView.closest("section").style.display = "block";
    }

    function activeFilterValue() {
      const active = document.querySelector(".blog-pill.pill-active");
      return active ? active.getAttribute("data-filter") : "all";
    }

    function setActivePill(val) {
      pills.forEach((p) => {
        p.classList.toggle("pill-active", p.getAttribute("data-filter") === val);
      });
    }

    function applyFilters() {
      if (!grid) return;
      const q = (search ? search.value : "").trim().toLowerCase();
      const filter = activeFilterValue();

      Array.from(grid.children).forEach((card) => {
        const cat = (card.getAttribute("data-category") || "").toLowerCase();
        const title = (card.getAttribute("data-title") || "").toLowerCase();
        const tags = (card.getAttribute("data-tags") || "").toLowerCase();

        const matchesCategory = filter === "all" || cat === filter;
        const matchesQuery = !q || title.includes(q) || tags.includes(q);

        card.style.display = matchesCategory && matchesQuery ? "block" : "none";
      });
    }

    function renderList() {
      if (!grid) return;
      const sorted = [...BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
      grid.innerHTML = sorted.map(postCardHtml).join("\n");
      applyFilters();
    }

    function renderOne(slug) {
      if (!postView) return;
      const post = BLOG_POSTS.find((p) => p.slug === slug);

      if (!post) {
        postView.innerHTML = `
          <div class="card">
            <h2>Post not found</h2>
            <p class="small">That link doesn’t match a post. Go back to the blog to view all articles.</p>
            <a class="btn btn-secondary" href="blog.html">Back to Blog</a>
          </div>
        `.trim();
        showPost();
        return;
      }

      postView.innerHTML = `
        <article class="blog-post card">
          <a class="blog-back" href="blog.html">← Back to all posts</a>
          <p class="blog-meta">${escapeHtml(post.category)} • ${formatDate(post.date)}</p>
          <h1 class="blog-title">${escapeHtml(post.title)}</h1>
          <div class="blog-hero">
            <img src="${escapeHtml(post.image)}" alt="${escapeHtml(post.title)}" loading="lazy" />
          </div>
          <div class="blog-content">${post.contentHtml}</div>
        </article>
      `.trim();

      showPost();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function route() {
      const hash = window.location.hash || "";
      const match = hash.match(/^#post=([^&]+)/);
      if (match) {
        renderOne(decodeURIComponent(match[1]));
      } else {
        showList();
        renderList();
      }
    }

    // Events
    pills.forEach((p) => {
      p.addEventListener("click", () => {
        setActivePill(p.getAttribute("data-filter"));
        applyFilters();
      });
    });

    if (search) {
      search.addEventListener("input", applyFilters);
    }

    window.addEventListener("hashchange", route);

    // init
    route();
  }

  // Run
  document.addEventListener("DOMContentLoaded", function () {
    renderFeatured();
    renderBlogIndex();
  });
})();
