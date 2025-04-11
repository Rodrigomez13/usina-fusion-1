-- Opción 1: Desactivar RLS para la tabla wallets (más rápido pero menos seguro)
ALTER TABLE wallets DISABLE ROW LEVEL SECURITY;

-- Opción 2: Mantener RLS pero crear políticas permisivas
-- Descomenta estas líneas si prefieres mantener RLS con políticas
/*
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Política para permitir SELECT a todos los usuarios autenticados
CREATE POLICY "Allow SELECT for authenticated users" 
ON wallets FOR SELECT 
USING (auth.role() = 'authenticated');

-- Política para permitir INSERT a todos los usuarios autenticados
CREATE POLICY "Allow INSERT for authenticated users" 
ON wallets FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Política para permitir UPDATE a todos los usuarios autenticados
CREATE POLICY "Allow UPDATE for authenticated users" 
ON wallets FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Política para permitir DELETE a todos los usuarios autenticados
CREATE POLICY "Allow DELETE for authenticated users" 
ON wallets FOR DELETE 
USING (auth.role() = 'authenticated');
*/

-- Verificar que las políticas se han aplicado correctamente
SELECT * FROM pg_policies WHERE tablename = 'wallets';
