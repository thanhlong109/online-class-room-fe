import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <div className="h-full py-10 bg-black mt-4">
      <div className="flex justify-center">
        <div className="space-y-6">
          <div className="flex justify-start space-x-5 text-white">
            <FacebookIcon fontSize="large" />
            <InstagramIcon fontSize="large" />
            <TwitterIcon fontSize="large" />
            <YouTubeIcon fontSize="large" />
          </div>

          <div className="grid grid-cols-2 gap-0 sm:grid-cols-4 sm:gap-4">
            <div className="space-y-2 text-gray-600">
              <p>Mô tả khóa học</p>
              <p>Quan hệ với nhà đầu tư</p>
              <p>Thông báo pháp lí</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Trung tâm trợ giúp</p>
              <p>Việc làm</p>
              <p>Tùy chọn cookie</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Thẻ quà tặng</p>
              <p>Điều khoản sử dụng</p>
              <p>Thông tin doanh nghiệp</p>
            </div>
            <div className="space-y-2 text-gray-600">
              <p>Trung tâm đa phương tiện</p>
              <p>Quyền riêng tư</p>
              <p>Liên hệ với chúng tôi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
