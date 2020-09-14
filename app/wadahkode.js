/*
const container = document.querySelector(".maintence"),
    demo = document.createElement("span");

let finishMaintence = new Date("May 24, 2020 00:00:00").getTime();

let timeLimit = setInterval(() => {
    let nowDate = new Date().getTime(),
        distance = finishMaintence - nowDate,
        days = Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds = Math.floor((distance % (1000 * 60)) / 1000);

    demo.innerHTML =
        "Website DINAS SOSIAL KABUPATEN TEGAL akan mendapat pembaruan tampilan (<b>" +
        days +
        "Hari, " +
        hours +
        "Jam " +
        minutes +
        "Menit " +
        seconds +
        "Detik</b>) paling lambat.";
    container.toggleAttribute("is-active-maintence");
    container.appendChild(demo);

    if (distance < 0) {
        clearInterval(timeLimit);
        demo.innerHTML =
            "Maaf kami tidak dapat menyelesaikan pembaruan untuk website DINAS SOSIAL KABUPATEN TEGAL.";
        container.appendChild(demo);
        container.toggleAttribute("is-deactive-maintence");
    }
}, 1000);
*/

// Api Function
const RestAPI = (url, config) => {
    let waktu = new Date(),
        seconds = waktu.getMilliseconds();

    return new Promise((resolve, reject) => {
        if (seconds < 5000) {
            setTimeout(() => {
                fetch(url, config)
                    .then(response => response.json())
                    .then(response => resolve(response));
            }, seconds);
        } else {
            reject("Kelamaan...");
        }
    });
};

// Timeline for progress export data, kecamatan, desa dan kelurahan
// class Timeline {
//     constructor(url, config) {
//         this.url = url;
//         this.config = config;
//         this.container = document.querySelector(".dashboard-data");
//         this.loading = document.querySelector(".card-loading");
//     }

//     totalFormatter(data, prefix) {
//         let number_string = data.toString(),
//             split = number_string.split(","),
//             sisa = split[0].length % 3,
//             rupiah = split[0].substr(0, sisa),
//             ribuan = split[0].substr(sisa).match(/\d{3}/gi);

//         if (ribuan) {
//             let separator = sisa ? "." : "";
//             rupiah += separator + ribuan.join(".");
//         }
//         rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
//         return prefix == undefined ? rupiah : rupiah ? "" + rupiah : "";
//     }

//     render(element) {
//         const { name, total, total_update, created_at, updated_at } = element;
//         let totalUpdate = "";

//         if (total_update > 0) {
//             totalUpdate += `<b>${total_update} </b> perubahan pada ${updated_at}`;
//         } else {
//             totalUpdate += `<b>${total_update} </b> perubahan sejak ${created_at}`;
//         }

//         return /*HTML*/ `<div class="item has-text-centered">
//             <h2 class="title">${name}</h2>
//             <p class="subtitle">
//                 ${this.totalFormatter(total)}
//             </p>
//             <div>
//                 ${totalUpdate}
//             </div>
//         </div>`;
//     }

//     setApiTimeline() {
//         let waktu = new Date(),
//             seconds = waktu.getMilliseconds();

//         return new Promise((resolve, reject) => {
//             if (seconds < 5000) {
//                 setTimeout(() => {
//                     fetch(this.url, this.config)
//                         .then(response => response.json())
//                         .then(response => {
//                             this.loading.style.display = "none";
//                             resolve(response);
//                         });
//                 }, seconds);
//             } else {
//                 reject("Kelamaan...");
//             }
//         });
//     }

//     async getApiTimeline() {
//         return await this.setApiTimeline();
//     }
// }

// Timeline Chart
// class ChartTimeline {
//     constructor(url, config) {
//         this.url = url;
//         this.config = config;
//         this.loading = document.querySelector(".card-loading");
//         this.response = {};
//     }

//     setApiTimeline() {
//         let waktu = new Date(),
//             seconds = waktu.getMilliseconds();

//         return new Promise((resolve, reject) => {
//             if (seconds < 5000) {
//                 setTimeout(() => {
//                     fetch(this.url, this.config)
//                         .then(response => response.json())
//                         .then(response => {
//                             this.loading.style.display = "none";
//                             resolve(response);
//                         });
//                 }, seconds);
//             } else {
//                 reject("Kelamaan...");
//             }
//         });
//     }

//     async getApiTimeline() {
//         return this.response = await this.setApiTimeline();
//     }

//     showDiagram(bottomLabel, entryData) {
//         const chartData = document.getElementById("chart-data").getContext("2d");
//         const myChart = new Chart(chartData, {
//             type: "line",
//             data: {
//                 labels: bottomLabel,
//                 datasets: [
//                     {
//                         label: "",
//                         data: entryData,
//                         fill: false,
//                         backgroundColor: "rgb(255,255,255)",
//                         borderColor: "rgba(255, 99, 132, 1)",
//                         borderWidth: 3,
//                         showLine: true
//                     }
//                 ]
//             },
//             options: {
//                 legend: {
//                     display: false
//                 },
//                 showLines: false, // disable for all datasets
//                 maintainAspectRation: false,
//                 scales: {
//                     yAxes: [
//                         {
//                             stacked: true,
//                             gridLines: {
//                                 display: true,
//                                 color: "rgba(256,99,132,0,.2)"
//                             }
//                         }
//                     ],
//                     xAxes: [
//                         {
//                             gridLines: {
//                                 display: true
//                             }
//                         }
//                     ]
//                 }
//             }
//         });
//         return myChart;
//     }
// }

// Download File
// class Download {
//     constructor(url, config) {
//         this.url = url;
//         this.config = config;
//         this.response = {};
//     }

//     async getApiDownload() {
//         return this.response = await RestAPI(this.url, this.config);
//     }

//     render(items) {
//         return `<div class="dropdown-item">
// 				<div class="box media">
//                     <div class="media-content">
//                         <p>${items.judul}</p>
//                         Telah didownload: <b>${items.hits} kali</b>
//                     </div>
//                     <div class="media-right">
//                         <a href="/download/file/${items.nama_file}" class="button is-success is-small is-rounded">Download</a>
//                     </div>
// 				</div>
// 			</div>`;
//     }
// }

// Show timeline
// const timeline = new Timeline("/timeline/api", { method: "GET", mode: "cors" }),
//     chartTimeline = new ChartTimeline("/timeline/api/sudah", { method: "GET", mode: "cors" });

// const carouselTimeline = timeline.getApiTimeline(),
//     chartDiagram = chartTimeline.getApiTimeline(),
//     labels = [],
//     data = [];

// carouselTimeline.then(response => {
//     let cards = "";

//     try {
//         response["kecamatan"].forEach(element => {
//             labels.push(element.name);
//             cards += timeline.render(element);
//         });
//         timeline.container.innerHTML = cards;

//         $(".owl-carousel").owlCarousel({
//             margin: 10,
//             loop: true,
//             pagination: false,
//             responsiveClass: true,
//             responsive: {
//                 0: {
//                     items: 1,
//                     nav: true
//                 },
//                 600: {
//                     items: 3,
//                     nav: false
//                 },
//                 1000: {
//                     items: 5,
//                     nav: true,
//                     loop: true
//                 }
//             }
//         });
//     }
//     catch (error) {
//         console.error(error);
//     }
// });

// chartDiagram.then(response => {
//     response["status_kecamatan"].forEach(item => {
//         if (item.total === "undefined" || item.total <= 0) {
//             item.total = 0;
//         }
//         const total = item.total;
//         data.push(total);
//     });

//     chartTimeline.showDiagram(labels, data);
// });

/*
if (window.location.pathname.lastIndexOf("timeline") > 1) {
    const timeline = new Timeline(window.location.href + "/api", { method: "GET", mode: "cors" }),
        chartTimeline = new ChartTimeline(window.location.href + "/api/sudah", { method: "GET", mode: "cors" });

    const carouselTimeline = timeline.getApiTimeline(),
        chartDiagram = chartTimeline.getApiTimeline(),
        labels = [],
        data = [];

    carouselTimeline.then(response => {
        let cards = "";

        try {
            response["kecamatan"].forEach(element => {
                labels.push(element.name);
                cards += timeline.render(element);
            });
            timeline.container.innerHTML = cards;

            $(".owl-carousel").owlCarousel({
                margin: 10,
                loop: true,
                pagination: false,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: true
                    },
                    600: {
                        items: 3,
                        nav: false
                    },
                    1000: {
                        items: 5,
                        nav: true,
                        loop: true
                    }
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    });

    chartDiagram.then(response => {
        response["status_kecamatan"].forEach(item => {
            if (item.total === "undefined" || item.total <= 0) {
                item.total = 0;
            }
            const total = item.total;
            data.push(total);
        });

        chartTimeline.showDiagram(labels, data);
    });
} else if (window.location.pathname.lastIndexOf("/") > 1
    || window.location.pathname.lastIndexOf("/main/") > 1) {
    const chartTimeline = new ChartTimeline(window.location.href.slice(0, 29) + "/timeline/api/sudah", { method: "GET", mode: "cors" }),
        timeline = new Timeline(window.location.href.slice(0, 29) + "/timeline/api", { method: "GET", mode: "cors" });

    let labels = [],
        data = []
    total = 0;

    timeline.getApiTimeline().then(response => {
        response["kecamatan"].forEach(item => {
            labels.push(item.name);
        });
    });

    chartTimeline.getApiTimeline().then(response => {
        response["status_kecamatan"].forEach(item => {
            if (item.total === "undefined" || item.total <= 0) {
                item.total = 0;
            }
            total = item.total;
            data.push(total);
        });
        chartTimeline.showDiagram(labels, data);
    });

    setInterval(function () {
        const chartTimeline = new ChartTimeline(window.location.href.slice(0, 29) + "/timeline/api/sudah", { method: "GET", mode: "cors" }),
            timeline = new Timeline(window.location.href.slice(0, 29) + "/timeline/api", { method: "GET", mode: "cors" });

        let labels = [],
            data = []
        total = 0;

        timeline.getApiTimeline().then(response => {
            response["kecamatan"].forEach(item => {
                labels.push(item.name);
            });
        });

        chartTimeline.getApiTimeline().then(response => {
            response["status_kecamatan"].forEach(item => {
                if (item.total === "undefined" || item.total <= 0) {
                    item.total = 0;
                }
                total = item.total;
                data.push(total);
            });
            chartTimeline.showDiagram(labels, data);
        });
    }, 1000 * 30);
}*/

// class App {
//     constructor(props) {
//         this.props = props;
//     }

//     navbarBurgerHandler() {
//         const burger = document.querySelector(".navbar-burger"),
//             AppItemLeft = document.querySelector('.AppItem-left'),
//             navbar = document.querySelector(".navbar");

//         burger.addEventListener("click", function () {
//             AppItemLeft.classList.toggle("is-active");
//             burger.classList.toggle("burger");
//             burger.classList.toggle("is-active");
//             navbar.classList.toggle("is-active");
//         });

//     }

//     navbarDropdownMenuHandler() {
//         const container = document.querySelector(".dropdown"),
//             btnDropdown = document.querySelectorAll(".dropdown-trigger");
//         let contentUnduhan = document.querySelector("#dropdown-unduhan"),
//             contentNotification = document.querySelector("#dropdown-notification"),
//             contentLogin = document.querySelector("#dropdown-login"),
//             contentSearch = document.querySelector("#dropdown-search");

//         btnDropdown.forEach(btn => {
//             btn.addEventListener("click", function () {
//                 //container.classList.toggle("is-active");
//                 if (this.getAttribute("aria-controls") == "dropdown-unduhan") {
//                     if (container.classList.contains("is-active")) {
//                         contentUnduhan.classList.toggle("is-hidden");
//                         contentNotification.className = "dropdown-content is-hidden";
//                         contentLogin.className = "dropdown-content is-hidden";
//                         contentSearch.className = "dropdown-content is-hidden";
//                     } else {
//                         container.classList.toggle("is-active");
//                         contentNotification.className = "dropdown-content is-hidden";
//                         contentLogin.className = "dropdown-content is-hidden";
//                         contentSearch.className = "dropdown-content is-hidden";
//                     }
//                     dropdownUnduhan();
//                 }

//                 if (this.getAttribute("aria-controls") == "dropdown-notification") {
//                     if (container.classList.contains("is-active")) {
//                         contentNotification.classList.toggle("is-hidden");
//                         contentUnduhan.className = "dropdown-content is-hidden";
//                         contentLogin.className = "dropdown-content is-hidden";
//                         contentSearch.className = "dropdown-content is-hidden";
//                     } else {
//                         container.classList.toggle("is-active");
//                         contentUnduhan.className = "dropdown-content is-hidden";
//                         contentLogin.className = "dropdown-content is-hidden";
//                         contentSearch.className = "dropdown-content is-hidden";
//                     }
//                 }

//                 if (this.getAttribute("aria-controls") == "dropdown-login") {
//                     if (container.classList.contains("is-active")) {
//                         contentLogin.classList.toggle("is-hidden");
//                         contentLogin.style.width = "auto";
//                         contentUnduhan.className = "dropdown-content is-hidden";
//                         contentNotification.className = "dropdown-content is-hidden";
//                         contentSearch.className = "dropdown-content is-hidden";
//                     } else {
//                         container.classList.toggle("is-active");
//                         contentLogin.style.width = "auto";
//                         contentUnduhan.className = "dropdown-content is-hidden";
//                         contentNotification.className = "dropdown-content is-hidden";
//                         contentSearch.className = "dropdown-content is-hidden";
//                     }
//                 }

//                 if (this.getAttribute("aria-controls") == "dropdown-search") {
//                     if (container.classList.contains("is-active")) {
//                         contentSearch.classList.toggle("is-hidden");
//                         contentUnduhan.className = "dropdown-content is-hidden";
//                         contentNotification.className = "dropdown-content is-hidden";
//                         contentLogin.className = "dropdown-content is-hidden";
//                     } else {
//                         container.classList.toggle("is-active");
//                         contentUnduhan.className = "dropdown-content is-hidden";
//                         contentNotification.className = "dropdown-content is-hidden";
//                         contentLogin.className = "dropdown-content is-hidden";
//                     }
//                 }
//             });
//         });
//     }

//     sidebarHandleClick() {
//         document.addEventListener("click", event => {
//             let targetId;

//             if (event.target.dataset.target != null) {
//                 targetId = document.querySelector("#" + event.target.dataset.target);
//                 //console.log("target 1: ", targetId);
//             } else {
//                 if (event.target.parentNode.dataset != null) {
//                     targetId = document.querySelector("#" + event.target.parentNode.dataset.target);
//                     //console.log("target 2: ", targetId);
//                 }
//             }

//             if (targetId != null) {
//                 targetId.classList.toggle("d-none");
//                 targetId.classList.toggle("d-block");
//             }
//         });
//     }

//     get register() {
//         this.sidebarHandleClick();
//         this.navbarDropdownMenuHandler();
//         this.navbarBurgerHandler();
//     }
// }

// const app = new App();
// app.register;

// Dropdowm unduhan
// function dropdownUnduhan() {
//     const download = new Download("/download/posts", { method: "GET", mode: "cors" });
//     let cardDownload = "";

//     download.getApiDownload().then(response => {
//         response["download"].map(item => {
//             cardDownload += download.render(item);
//         });
//     });

//     const unduhan = document.querySelector("#dropdown-unduhan");
//     unduhan.style.width = "360px";
//     unduhan.style.height = "360px";
//     unduhan.style.overflow = "auto";
//     //unduhan.innerHTML = '<div class="card-loading"></div>';
//     setTimeout(() => {
//         unduhan.innerHTML = cardDownload;
//     }, 2000);
// }
