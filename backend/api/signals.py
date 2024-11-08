# backend/api/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Note
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

@receiver(post_save, sender=Note)
def send_acceptance_email(sender, instance, **kwargs):
    if instance.is_accepted:  # Solo envía el correo si la solicitud es aceptada
        user_email = instance.author.email  # Usa `author` en lugar de `user`

        # Definir el asunto del correo
        subject = "Confirmación de Solicitud de Visita al Campus de Tecsup"

        # Mensaje en texto sin formato (opcional)
        text_content = "Su solicitud de visita al campus de Tecsup ha sido aceptada. Para más detalles, visite nuestra página web."

        # Renderizar el contenido HTML del correo
        html_content = render_to_string("email_templates/confirmacion_visita.html", {
            "user_name": instance.author.username,  # Pasamos datos al template
            "website_url": "https://www.tecsup.edu.pe"
        })

        # Crear el correo y agregar contenido alternativo
        msg = EmailMultiAlternatives(subject, text_content, 'exploratec.app@gmail.com', [user_email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
