CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePaymentInformation`(
IN p_email varchar(50),
IN p_newCredNum varchar(50)
)
BEGIN

SET @fn = (select fullName from Reader where emailAddress = p_email);
SET SQL_SAFE_UPDATES = 0;
SET FOREIGN_KEY_CHECKS = 0;
update Membership set creditCardNum = p_newCredNum where creditCardNum = (select creditCardNum from Reader where fullName = (select fullName from Reader where emailAddress = p_email));
update Reader set creditCardNum = p_newCredNum where fullName = @fn;
SET FOREIGN_KEY_CHECKS = 1;
select 'success';

END
