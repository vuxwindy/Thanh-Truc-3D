// src/components/LiveAgentChatWidget.js
import React, { useEffect, memo } from 'react';

const LiveAgentChatWidget = () => {
  useEffect(() => {
    // ID của script và ID nút từ đoạn mã của bạn
    const scriptId = import.meta.env.VITE_TAWK_TO_SCRIPT_ID;
    const buttonId = import.meta.env.VITE_TAWK_TO_BUTTON_ID;
    const scriptSrc = import.meta.env.VITE_TAWK_TO_SCRIPT_SRC;

    // Kiểm tra xem script đã tồn tại chưa để tránh thêm nhiều lần
    if (document.getElementById(scriptId)) {
      // Nếu script đã tồn tại, có thể cần khởi tạo lại nút nếu nó bị gỡ bỏ
      // Tuy nhiên, thường thì chỉ cần load script một lần là đủ
      // Nếu gặp vấn đề, hãy kiểm tra xem LiveAgent API có hàm để re-init không
      if (typeof LiveAgent !== 'undefined' && LiveAgent.createButton) {
         // Thử tạo lại nút nếu cần thiết (ít khi cần)
         // LiveAgent.createButton(buttonId, document.getElementById(scriptId));
      }
      return; // Thoát nếu script đã có
    }

    // Tạo thẻ script mới
    const script = document.createElement('script');
    script.id = scriptId;
    script.defer = true; // hoặc script.async = true; defer thường tốt hơn cho việc này
    script.src = scriptSrc;

    // Xử lý khi script được tải xong
    script.onload = () => {
      // Kiểm tra xem đối tượng LiveAgent đã được định nghĩa chưa
      if (typeof LiveAgent !== 'undefined' && LiveAgent.createButton) {
        try {
          // Gọi hàm tạo nút của LiveAgent
          LiveAgent.createButton(buttonId, script); // Truyền ID nút và element script
        } catch (error) {
          console.error("Lỗi khi khởi tạo nút LiveAgent:", error);
        }
      } else {
        console.error("Đối tượng LiveAgent hoặc hàm createButton không tồn tại sau khi script tải.");
      }
    };

    // Xử lý lỗi nếu script không tải được
    script.onerror = () => {
      console.error(`Không thể tải script LiveAgent từ: ${scriptSrc}`);
    };

    // Thêm script vào cuối thẻ <body>
    document.body.appendChild(script);

    // --- Hàm Cleanup ---
    // Chạy khi component bị unmount (ví dụ: chuyển trang trong SPA)
    return () => {
      // 1. Xóa script đã thêm
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }

      // 2. Quan trọng: Tìm và xóa các element mà LiveAgent đã tạo ra
      // LiveAgent thường tạo ra một div hoặc iframe cho nút chat.
      // Bạn cần kiểm tra DOM (dùng Inspect Element trong trình duyệt)
      // để tìm ID hoặc class của các element đó và xóa chúng ở đây.
      // Ví dụ (ID này có thể không đúng, bạn cần tự kiểm tra):
      const liveAgentButton = document.getElementById(`liveagent_button_${buttonId}`); // Hoặc một ID/class khác
      if (liveAgentButton && liveAgentButton.parentNode) {
          liveAgentButton.parentNode.removeChild(liveAgentButton);
      }
      // Có thể có các element khác (như cửa sổ chat) cần được xóa.

      // 3. (Tùy chọn) Kiểm tra xem LiveAgent có cung cấp hàm API để "destroy" hoặc "shutdown" widget không.
      // if (typeof LiveAgent !== 'undefined' && LiveAgent.shutdown) {
      //   LiveAgent.shutdown();
      // }
    };

  }, []); // Mảng dependency rỗng đảm bảo useEffect chỉ chạy một lần sau khi component mount

  // Component này không cần render gì ra giao diện người dùng
  return null;
};

// Sử dụng memo để ngăn re-render không cần thiết nếu component cha thay đổi
export default memo(LiveAgentChatWidget);