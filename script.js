//hiệu ứng của header
window.onscroll = function() {stickyHeader()};
var header = document.querySelector('.header');
var topBarHeight = document.querySelector('.top-bar').offsetHeight;
function stickyHeader() {
    if (window.pageYOffset > topBarHeight) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }
}


// Nút mũi tên quay về đầu trang
const scrollToTopButton = document.getElementById('scrollToTop');
// Hiện nút khi cuộn xuống
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});
// Cuộn lên đầu trang khi bấm nút
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


//Nút menu
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector(".close-btn");

    // Mở menu khi nhấn nút menu
    menuToggle.addEventListener("click", function () {
        sidebar.classList.add("active");
    });

    // Đóng menu khi nhấn nút X
    closeBtn.addEventListener("click", function () {
        sidebar.classList.remove("active");
    });

    // Đóng menu khi nhấn ngoài sidebar
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove("active");
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.getElementById("shareButton");
    const shareBox = document.getElementById("shareBox");
    const closeShareBox = document.getElementById("closeShareBox");
    const shareLink = document.getElementById("shareLink");
    const copyLink = document.getElementById("copyLink");
    const shareFacebook = document.getElementById("shareFacebook");
    const shareMessenger = document.getElementById("shareMessenger");
    const shareZalo = document.getElementById("shareZalo");

    const currentUrl = window.location.href;

    // Kiểm tra nếu các phần tử tồn tại trong DOM
    if (shareMessenger && shareZalo && currentUrl) {
        // Chia sẻ Facebook
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

        // Chia sẻ Messenger
        shareMessenger.href = `https://www.messenger.com/share?link=${encodeURIComponent(currentUrl)}`;

        // Chia sẻ Zalo
        shareZalo.href = `https://zalo.me/share?url=${encodeURIComponent(currentUrl)}`;
    }

    // Hiển thị hộp chia sẻ khi nhấn vào nút chia sẻ
    shareButton.addEventListener("click", function (event) {
        event.stopPropagation();   // Ngăn chặn sự kiện lan ra document
        shareBox.classList.toggle("hidden");
        shareLink.value = currentUrl; // Lấy URL hiện tại
    });

    // Đóng hộp chia sẻ khi nhấn vào nút đóng
    closeShareBox.addEventListener("click", function (event) {
        event.stopPropagation();
        shareBox.classList.add("hidden");
    });

    // Đóng hộp chia sẻ khi nhấn ra ngoài
    document.addEventListener("click", function (event) {
        if (!shareBox.contains(event.target) && !shareButton.contains(event.target)) {
            shareBox.classList.add("hidden");
        }
    });

    // Sao chép link vào clipboard
    copyLink.addEventListener("click", function (event) {
        try {
            shareLink.select();
            document.execCommand("copy");
            alert("Đã sao chép link!");
        } catch (err) {
            alert("Lỗi khi sao chép link.");
        }
    });
});


//Hiệu ứng ngừng video
document.addEventListener("DOMContentLoaded", function () {
    const ytVideoFrame = document.querySelector(".video-content iframe");

    function isElementInViewport(el) {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkVideoVisibility() {
        // Điều khiển YouTube iframe
        if (ytVideoFrame && ytVideoFrame.contentWindow) {
            if (!isElementInViewport(ytVideoFrame)) {
                ytVideoFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
            }
        }

        // Điều khiển tất cả video HTML5
        const htmlVideos = document.querySelectorAll(".info-content video");
        htmlVideos.forEach(video => {
            if (!isElementInViewport(video)) {
                video.pause();
                video.dataset.userPaused = "true"; 
            }
        });
    }

    // Ngăn video tự động phát khi quay lại
    function handleVideoInteraction() {
        this.dataset.userPaused = "false"; 
    }

    document.querySelectorAll(".info-content video").forEach(video => {
        video.addEventListener("play", handleVideoInteraction);
    });

    // Kiểm tra khi cuộn hoặc thay đổi kích thước
    checkVideoVisibility(); // Kiểm tra ngay khi tải trang
    window.addEventListener("scroll", checkVideoVisibility);
    window.addEventListener("resize", checkVideoVisibility);
});




//Hiệu ứng cuộn của trang giới thiệu//
// Điều chỉnh vị trí khi click vào các liên kết
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        const offsetTop = targetElement.offsetTop;

        // Thêm một chút khoảng cách trên cùng để không bị che khuất bởi header cố định (nếu có)
        window.scrollTo({
            top: offsetTop - 150, // Điều chỉnh giá trị -50 tùy theo yêu cầu
            behavior: 'smooth'
        });
    });
});



//Hiệu ứng trang ứng dụng//

// Thêm sự kiện hover để hiển thị mô tả sản phẩm
const productItems = document.querySelectorAll('.product-item');

productItems.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('show-description'); // Hiển thị mô tả khi hover
    });
    item.addEventListener('mouseout', () => {
        item.classList.remove('show-description'); // Ẩn mô tả khi không hover
    });
});

// Hàm toggleInfo để mở/đóng phần mô tả sản phẩm
function toggleInfo(id) {
    let currentBox = document.getElementById(id);
    let allBoxes = document.querySelectorAll('.info-box');
    let allButtons = document.querySelectorAll('.toggle-btn');

    allBoxes.forEach((box, index) => {
        let button = allButtons[index];

        // Đặt lại nút khi đóng
        if (box !== currentBox) {
            box.style.maxHeight = "0px";
            box.style.padding = "0px";
            let action = button.getAttribute('data-action');
            if (action === "buy") {
                button.textContent = "Mua hàng";
            } else if (action === "view-more") {
                button.textContent = "Xem thêm";
            }
        }
    });

    let button = currentBox.previousElementSibling; // Lấy nút của phần hiện tại
    let action = button.getAttribute('data-action');
    
    // Kiểm tra trạng thái của hộp thông tin và thay đổi nút theo hành động        
    if (currentBox.style.maxHeight === "0px" || currentBox.style.maxHeight === "") {
        currentBox.style.maxHeight = "500px"; // Độ cao phù hợp
        currentBox.style.padding = "15px";
        button.textContent = "Đóng"; // Thay đổi nút thành "Đóng"
    } else {
        currentBox.style.maxHeight = "0px";
        currentBox.style.padding = "0px";

        // Dừng video khi đóng
        let iframe = currentBox.querySelector("iframe");
        let video = currentBox.querySelector("video");
        if (iframe) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
        }
        if (video) {
            video.pause();
        }

        if (action === "buy") {
            button.textContent = "Mua hàng"; // Nút Mua hàng sẽ chuyển lại thành "Mua hàng"
        } else if (action === "view-more") {
            button.textContent = "Xem thêm"; // Nút Xem thêm sẽ chuyển lại thành "Xem thêm"
        }
    }
}

// Hàm chuyển đổi sản phẩm trong slider
function changeProduct(direction) {
    let activeBox = document.querySelector(".info-box:not([style*='max-height: 0px'])"); // Lấy hộp đang mở
    if (!activeBox) return;

    let productItems = activeBox.querySelectorAll(".product-item");
    let currentProduct = activeBox.querySelector(".product-item.active");
    let currentIndex = Array.from(productItems).indexOf(currentProduct);

    productItems[currentIndex].classList.remove("active");

    let newIndex = (currentIndex + direction + productItems.length) % productItems.length;
    productItems[newIndex].classList.add("active");
} 

// Thêm sự kiện click cho tên sản phẩm và mô tả
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('click', function() {
        // Xóa bỏ hiệu ứng click từ tất cả sản phẩm
        document.querySelectorAll('.product-item').forEach(item => item.classList.remove('clicked'));
        
        // Thêm hiệu ứng click cho sản phẩm đang được click
        item.classList.add('clicked');
    });
});

