import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmarEmail } from "../../../services/user.service";
import tiraDuvidasLogo from "../../../utils/images/Logo-Tira-Dúvidas-removebg.png";
import ufmsLogo from "../../../utils/images/ufms-logo.png";
import "./ConfirmarEmail.css";

function ConfirmarEmail() {
const [searchParams] = useSearchParams();
const navigate = useNavigate();

const [status, setStatus] = useState("confirmando");
const [message, setMessage] = useState("");

useEffect(() => {
const hash = searchParams.get("hash");


if (!hash) {
  setStatus("erro");
  setMessage("Link de confirmação inválido.");
  return;
}

const confirmar = async () => {
  try {
    await confirmarEmail(hash);

    setStatus("sucesso");
    setMessage("Seu e-mail foi confirmado com sucesso!");
  } catch (error) {
    console.error("Erro ao confirmar e-mail:", error);

  setStatus("erro");

  if (error.message === "notFound") {
    setMessage(
      "O link de confirmação é inválido ou já foi utilizado."
    );
  } else {
    setMessage(
      "Não foi possível confirmar seu e-mail. Tente novamente."
    );
  }
  }
};

confirmar();

}, [searchParams]);

const handleLogin = () => {
navigate("/login");
};

return ( <div className="confirm-email-page"> <div className="confirm-email-container">


    
    <div className="confirm-email-left-panel">

      <img
        src={tiraDuvidasLogo}
        alt="Tira Dúvidas"
        className="confirm-email-logo"
      />

      <p className="confirm-email-description">
        <em>
          Tire suas dúvidas relacionadas à
          <br />
          TIC's com estudantes da UFMS
        </em>
      </p>

      <p className="confirm-email-footer">
        Projeto de ensino - PET-Sistemas
      </p>

    </div>

    <div className="confirm-email-divider"></div>

    
    <div className="confirm-email-right-panel">

      {status === "confirmando" && (
        <div className="confirm-email-content">

          <div className="confirm-icon loading">
            <span></span>
          </div>

          <h1>Confirmando seu e-mail</h1>

          <p>
            Estamos verificando seu cadastro.
            <br />
            Aguarde alguns instantes...
          </p>

        </div>
      )}

      {status === "sucesso" && (
        <div className="confirm-email-content">

          <div className="confirm-icon success">
            ✓
          </div>

          <h1>E-mail confirmado!</h1>

          <p>
            Seu e-mail foi confirmado com sucesso.
            <br />
            Sua conta está pronta para ser utilizada.
          </p>

          <button
            className="confirm-email-button"
            onClick={handleLogin}
          >
            Ir para o login
          </button>

        </div>
      )}

      {status === "erro" && (
        <div className="confirm-email-content">

          <div className="confirm-icon error">
            !
          </div>

          <h1>Erro na confirmação</h1>

          <p>{message}</p>

          <button
            className="confirm-email-button"
            onClick={handleLogin}
          >
            Ir para o login
          </button>

        </div>
      )}

      <img
        src={ufmsLogo}
        alt="UFMS"
        className="confirm-email-ufms-logo"
      />

    </div>
  </div>
</div>


);
}

export default ConfirmarEmail;
