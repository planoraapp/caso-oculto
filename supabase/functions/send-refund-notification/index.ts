
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RefundNotificationRequest {
  userEmail: string;
  packId: string;
  reason?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, packId, reason }: RefundNotificationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "CASO OCULTO <noreply@casooculto.com>",
      to: ["conectawebapps@outlook.com"],
      subject: "Nova Solicitação de Devolução - CASO OCULTO",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626, #991b1b); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">CASO OCULTO</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Nova Solicitação de Devolução</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #dc2626; margin-top: 0;">Detalhes da Solicitação</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Usuário:</strong> ${userEmail}</p>
              <p><strong>Pack:</strong> ${packId}</p>
              <p><strong>Data da Solicitação:</strong> ${new Date().toLocaleString('pt-BR')}</p>
              ${reason ? `<p><strong>Motivo:</strong> ${reason}</p>` : ''}
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>Ação Necessária:</strong> Acesse o painel administrativo para processar esta solicitação de devolução.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://seu-dominio.com/admin" 
                 style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Acessar Painel Admin
              </a>
            </div>
          </div>
          
          <div style="background: #343a40; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Este é um email automático do sistema CASO OCULTO</p>
          </div>
        </div>
      `,
    });

    console.log("Refund notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-refund-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
