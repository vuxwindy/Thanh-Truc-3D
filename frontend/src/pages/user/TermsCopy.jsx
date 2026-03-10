import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import PaymentMethods from './PaymentMethods';
import HandlingInstall from './HandlingInstall';
import HandlingProcess from './HandlingProcess';
import RefundPolicy from './RefundPolicy';
import WarrantyPolicy from './WarrantyPolicy';
import InspectionPolicy from './InspectionPolicy';
import AboutThanhTruc from './AboutThanhTruc';
import CopyrightGameHelp from './CopyrightGameHelp';


const Termsc = () => {
  const { t } = useTranslation();
  const [selectedPage, setSelectedPage] = useState("AboutThanhTruc");
  const menu = [
    { title: t('userManual.menu.AboutThanhTruc'), key: "AboutThanhTruc" },
    { title: t('userManual.menu.CopyrightGameHelp'), key: "CopyrightGameHelp" },
    { title: t('userManual.menu.PrivacyPolicy'), key: "PrivacyPolicy" },
    { title: t('userManual.menu.InspectionPolicy'), key: "InspectionPolicy" },
    { title: t('userManual.menu.RefundPolicy'), key: "RefundPolicy" },
    { title: t('userManual.menu.WarrantyPolicy'), key: "WarrantyPolicy" },
    { title: t('userManual.menu.HandlingProcess'), key: "HandlingProcess" },
    { title: t('userManual.menu.HandlingInstall'), key: "HandlingInstall" },
    { title: t('userManual.menu.PaymentMethods'), key: "PaymentMethods" },
    { title: t('userManual.menu.Terms'), key: "Terms" },
  ];
  const renderContent = () => {
    switch (selectedPage) {
      case "PrivacyPolicy":
        return <PrivacyPolicy />;
      case "Terms":
        return <Terms />;
      case "PaymentMethods":
        return <PaymentMethods />;
      case "HandlingInstall":
        return <HandlingInstall />;
      case "HandlingProcess":
        return <HandlingProcess />;
      case "InspectionPolicy":
        return <InspectionPolicy />;
      case "RefundPolicy":
        return <RefundPolicy />;
      case "WarrantyPolicy":
        return <WarrantyPolicy />;
      case "AboutThanhTruc":
        return <AboutThanhTruc />;
      case "CopyrightGameHelp":
        return <CopyrightGameHelp />;
      // case "CopyrightGameHelp":
      // return <CopyrightGameHelp />;

      default:
        return <p>{t('userManual.selectPrompt')}</p>;
    }
  };
  return (
    <Container className="py-4 text-light ">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <em>{t('userManual.intro')}</em>
          </section>
        </Col>
      </Row>

      <Row className="my-5">
        {/* Sidebar bên trái */}
        <Col md={3}>
          <ul className="list-group list-group-flush bg-dark rounded shadow">
            {menu.map((item, idx) => (
              <li
                key={idx}
                className={`list-group-item bg-transparent text-light ${selectedPage === item.key ? "active fw-bold" : "border-0"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPage(item.key)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </Col>

        {/* Nội dung bên phải */}
        <Col md={9}>{renderContent()}</Col>
      </Row>




    </Container>
  );
};

export default Termsc;