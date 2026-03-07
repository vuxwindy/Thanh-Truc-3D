import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const HandlingInstall = () => {
  const { t } = useTranslation();

  return (
    // <div className="flex min-h-screen">
    <Container className="py-4">
      <Row>
        <Col>

          <section className="mt-4">
            <p className="lead">{t('handlingInstall.updated')} {new Date().toLocaleDateString()}</p>
            <p>{t('handlingInstall.intro')}</p>
            <p><strong>Bước 1: </strong><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.step1') }}></span></p>
            <img
              src="/huong-dan-installS1.png"
              className="img-fluid rounded mx-auto d-block"
              alt="huong-dan-installS1"
            />
            <p>&nbsp;</p>
            <p><strong>Bước 2: </strong><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.step2') }}></span></p>
            <img
              src="/helpDownloadProductS3.png"
              className="img-fluid rounded mx-auto d-block"
              alt="huong-dan-installS1"
            />
            <p>&nbsp;</p>
            <p><strong>Bước 3: </strong> {t('handlingInstall.step3')}</p>
          </section>
          <p>&nbsp;</p>
          <section>
            <strong>{t('handlingInstall.unity.title')}</strong>
            <p>{t('handlingInstall.unity.req')}</p>
            <p> <span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s1') }}></span></p>
            <p>{t('handlingInstall.unity.s1Desc')}</p>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s2') }}></span></p>
            <ul>
              <li>{t('handlingInstall.unity.s2L1')}</li>
              <li>{t('handlingInstall.unity.s2L2')}</li>
              <ul>
                <li>{t('handlingInstall.unity.s2L2A')}</li>
                <li>{t('handlingInstall.unity.s2L2B')}</li>
              </ul>
            </ul>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s3') }}></span></p>
            <ul>
              <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s3L1') }}></span></li>
              <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s3L2') }}></span></li>
              <li>{t('handlingInstall.unity.s3L3')}</li>
              <li>{t('handlingInstall.unity.s3L4')}</li>
            </ul>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s4') }}></span></p>
            <p>{t('handlingInstall.unity.s4Desc1')}</p>
            <ul>
              <li>{t('handlingInstall.unity.s4L1')}</li>
              <li>{t('handlingInstall.unity.s4L2')}</li>
            </ul>
            <p>{t('handlingInstall.unity.s4Desc2')}</p>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s5') }}></span></p>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s5Android') }}></p>
            <ul>
              <li>{t('handlingInstall.unity.s5AL1')}</li>
              <li>{t('handlingInstall.unity.s5AL2')}</li>
              <li>{t('handlingInstall.unity.s5AL3')}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.unity.s5Ios') }}></p>
            <ul>
              <li>{t('handlingInstall.unity.s5IL1')}</li>
              <li>{t('handlingInstall.unity.s5IL2')}</li>
            </ul>
          </section>
          <p>&nbsp;</p>
          <section>
            <strong>{t('handlingInstall.reactNode.title')}</strong>
            <p>{t('handlingInstall.reactNode.req')}</p>
            <p> <span dangerouslySetInnerHTML={{ __html: t('handlingInstall.reactNode.s1') }}></span></p>
            <p>{t('handlingInstall.reactNode.s1Desc1')}</p>
            <p>{t('handlingInstall.reactNode.s1Desc2')}</p>
            <ul>
              <li>{t('handlingInstall.reactNode.s1L1')}</li>
              <li>{t('handlingInstall.reactNode.s1L2')}</li>
              <li>{t('handlingInstall.reactNode.s1L3')}</li>
            </ul>
            <p>{t('handlingInstall.reactNode.s1Desc3')}</p>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.reactNode.s2') }}></span></p>
            <p>{t('handlingInstall.reactNode.s2Desc1')}</p>
            <ul>
              <li>{t('handlingInstall.reactNode.s2L1')}</li>
              <li>{t('handlingInstall.reactNode.s2L2')}</li>
            </ul>
            <p>{t('handlingInstall.reactNode.s2Desc2')}</p><p>{t('handlingInstall.reactNode.s2Desc3')}</p>
            <ul>
              <li>{t('handlingInstall.reactNode.s2L3')}</li>
              <li>{t('handlingInstall.reactNode.s2L4')}</li>
              <li>{t('handlingInstall.reactNode.s2L5')}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.reactNode.s2Warning') }}></p>
            <p>{t('handlingInstall.reactNode.s2Desc4')}</p>
            <ul>
              <li>{t('handlingInstall.reactNode.s2L6')}</li>
              <li>{t('handlingInstall.reactNode.s2L7')}</li>
            </ul>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.reactNode.s3') }}></span></p>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.reactNode.s3L1') }}></p>
            <p>{t('handlingInstall.reactNode.s3L2')}</p>
            <p><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.reactNode.s4') }}></span></p>
            <ul>
              <li>{t('handlingInstall.reactNode.s4L1')}</li>
              <li>{t('handlingInstall.reactNode.s4L2')}</li>
              <li>{t('handlingInstall.reactNode.s4L3')}</li>
            </ul>
          </section>
          <p>&nbsp;</p>
          <section>
            <strong>{t('handlingInstall.php.title')}</strong>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s1') }}></p>
            <ul>
              <li>{t('handlingInstall.php.s1L1')}</li>
              <li>{t('handlingInstall.php.s1L2')}</li>
            </ul>
            <p>{t('handlingInstall.php.s1Desc1')}</p>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s2') }}></p>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s2Desc1') }}></p>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s2Desc2') }}></p>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s3') }}></p>
            <ul>
              <li>{t('handlingInstall.php.s3L1')}</li>
              <li>{t('handlingInstall.php.s3L2')}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s4') }}></p>
            <ul>
              <li>{t('handlingInstall.php.s4L1')}</li>
              <li>{t('handlingInstall.php.s4L2')}</li>
              <li>{t('handlingInstall.php.s4L3')}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s5') }}></p>
            <img
              src="/cai-php.png"
              className="img-fluid rounded mx-auto d-block"
              alt="KIỂM TRA FILE CẤU HÌNH php"
            />
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.php.s5Desc1') }}></p>
            <p>{t('handlingInstall.php.s5Desc2')}</p>
          </section>
          <p>&nbsp;</p>
          <section>
            <strong>{t('handlingInstall.python.title')}</strong>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s1') }}></p>
            <ul>
              <li>{t('handlingInstall.python.s1L1')}</li>
              <li>{t('handlingInstall.python.s1L2')}</li>
              <li>{t('handlingInstall.python.s1L3')}</li>
              <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s1L4') }}></span></li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s2') }}></p>
            <ul>
              <li>{t('handlingInstall.python.s2L1')}</li>
              <li>{t('handlingInstall.python.s2L2')}</li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s3') }}></p>
            <p>{t('handlingInstall.python.s3T1')}</p>
            <ul>
              <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s3L1') }}></span></li>
              <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s3L2') }}></span> </li>
              <li>{t('handlingInstall.python.s3L3')}</li>
            </ul>
            <p>{t('handlingInstall.python.s3T2')}</p>
            <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s3L4') }}></span></li>
            <ul></ul>
            <p>{t('handlingInstall.python.s3T3')}</p>
            <ul>
              <li><span dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s3L5') }}></span></li>
            </ul>
            <p dangerouslySetInnerHTML={{ __html: t('handlingInstall.python.s4') }}></p>
            <ul>
              <li>{t('handlingInstall.python.s4L1')}</li>
              <li>{t('handlingInstall.python.s4L2')}</li>
            </ul>
          </section>
          <section>
            <p>{t('handlingInstall.support')}</p>
            <ul>
              {/* <li>Hotline:  0332354286 </li> */}
              {/* <li>Mail: lucentiscompany@gmail.com</li> */}
              {/* <li>Facebook: <a href="https://www.facebook.com/profile.php?id=100016006836122">Nhân viên chăm sóc khách hàng</a> </li> */}
            </ul>
          </section>
        </Col>
      </Row>
    </Container>

    // {/* <Sidebar />
    // <Content /> */}

  );
};

export default HandlingInstall;
